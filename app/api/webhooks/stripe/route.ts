import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    )
  } catch (error) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log(`💰 PaymentIntent: ${JSON.stringify(paymentIntent)}`)

    // @ts-ignore
    const userId = paymentIntent.client_reference_id;
    // @ts-ignore
    const stripeSubscriptionId = paymentIntent.subscription;

    if (typeof stripeSubscriptionId !== "string") {
      return new Response(`Webhook Error: Missing or invalid subscription id from ${userId}`, { status: 400 })
    }
    const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
    const newPriceId = subscription.items.data[0].price.id;

    let creditAmount = 0

    // @ts-ignore
    switch (paymentIntent.amount_subtotal) {
      case 500:
      case 1900:
        creditAmount = 200
        break
      case 2000:
      case 3000:
      case 3500:
      case 3900:
        creditAmount = 600
        break
      case 7000:
      case 7900:
      case 9900:
        creditAmount = 1500
        break
    }
    //   stripeCustomerId       String?   @unique @map(name: "stripe_customer_id")
    // stripeSubscriptionId   String?   @unique @map(name: "stripe_subscription_id")
    // stripePriceId          String?   @map(name: "stripe_price_id")
    // stripeCurrentPeriodEnd DateTime? @map(name: "stripe_current_period_end")
    // Update user's credits balance with the amount they purchased and get the updated user record back from the database.
    const userWhoPurchased = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        credits: {
          increment: creditAmount,
        },
        stripeSubscriptionId: subscription.id,
        stripePriceId: newPriceId,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
      include: {
        _count: {
          select: {
            purchases: true,
          },
        },
      },
    })

    // If this user was referred to Sine, and this is their first purchase, give the referrer 10 credits.
    if (
      userWhoPurchased?.referredByUserId &&
      userWhoPurchased._count.purchases === 0
    ) {
      await db.user.update({
        where: {
          id: userWhoPurchased.referredByUserId,
        },
        data: {
          credits: {
            increment: 10,
          },
          creditsEarnedViaReferrals: {
            increment: 10,
          },
        },
      })
    }

    // Create purchase record for tracking
    await db.purchase.create({
      data: {
        creditAmount: creditAmount,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  } else if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    console.log(
      `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
    )
  } else if (event.type === "charge.succeeded") {
    const charge = event.data.object as Stripe.Charge
    console.log(`💵 Charge id: ${charge.id}`)
  } else {
    console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
  }

  return new Response(null, { status: 200 })
}
