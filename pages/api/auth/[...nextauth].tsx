import { sendEmail } from "emails";
import LoginLink from "emails/login-link";
import WelcomeEmail from "@/emails/welcome-email"
// import { sendMarketingMail } from "@/emails/index"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextApiRequest } from "next"
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"

const googleClientId = process.env.GOOGLE_CLIENT_ID as string
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string

export const authOptionsWithEvents = (req: NextApiRequest, res) => {
  return {
    ...authOptions,
    events: {
      async signIn(message) {
        if (message.isNewUser) {
          const email = message.user.email
          const name = message.user.name

          const isReferred =
            req && req?.cookies && req?.cookies["referralCode"]

          if (isReferred) {
            const referredByUser = req.cookies["referralCode"]

            await db.$transaction([
              db.user.update({
                where: {
                  id: referredByUser,
                },
                data: {
                  credits: {
                    increment: 1,
                  },
                  creditsEarnedViaReferrals: {
                    increment: 1,
                  },
                },
              }),
              db.user.update({
                where: {
                  email,
                },
                data: {
                  referredByUser: {
                    connect: {
                      id: referredByUser,
                    },
                  },
                },
              }),
            ])
          }

          if (email) {
            await Promise.all([
              sendEmail({
                email: email,
                subject: "🎨 Welcome to Sine",
                react: WelcomeEmail({ name, email }),
              }),
            ])
          }
        }
      },
    },
    providers: [
      GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      }),
      EmailProvider({
        sendVerificationRequest: async ({
          identifier,
          url,
          provider,
        }) => {
          console.log("Login URL:", url)
          await sendEmail({
            email: identifier,
            subject: "Your Sine Login Link",
            react: LoginLink({ url, email: identifier }),
          });
        },
      }),
    ],
    callbacks: {
      async session({ token, session }) {
        if (token) {
          session.user.id = token.id
          session.user.name = token.name
          session.user.email = token.email
          session.user.image = token.picture
          session.user.credits = token.credits
        }

        return session
      },
      async jwt({ token, user }) {
        const dbUser = await db.user.findFirst({
          where: {
            email: token.email,
          },
        })

        if (!dbUser) {
          if (user) {
            token.id = user?.id
          }
          return token
        }

        let credits = dbUser.credits;
        if (!dbUser.stripeCurrentPeriodEnd || dbUser.stripeCurrentPeriodEnd.getTime() < new Date().getTime()) {
          credits = 0
          if (dbUser.credits !== 0) {
            await db.user.update({
              where: {
                id: dbUser.id,
              },
              data: {
                credits: 0
              }
            })
          }
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
          credits,
        }
      },
      authorized({ auth }) {
        return !!auth?.user // this ensures there is a logged in user for -every- request
      }
    },
  }
}

// @see ./lib/auth
export default (req: NextApiRequest, res) =>
  NextAuth(req, res, authOptionsWithEvents(req, res))

// export default NextAuth(authOptionsWithEvents)
