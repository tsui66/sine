import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { StripePricingTable } from "@/components/stripe-pricing-table"
import { buttonVariants } from "@/components/ui/button"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"
import Script from "next/script"

export const metadata = {
    title: "Buy credits",
    description: "Manage your account credits and purchase more",
}

export default async function CreditsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    return (
        <DashboardShell>
            <Script src="https://js.stripe.com/v3/pricing-table.js" />
            <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem] text-center mt-8">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Purchase Credits
                </h2>
                <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-center">
                    Unlock all features and get unlimited access to all of our
                    future updates.
                </p>
            </div>

            <div className="grid gap-8 mt-8">
                <StripePricingTable clientReferenceId={user.id} customerEmail={user.email} />
            </div>
            <div className="grid w-full items-start gap-10  p-10 container mx-auto max-w-lg mt-6">
                <section
                    id="open-source"
                    className="container py-8 md:py-12 lg:py-24"
                >
                    <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                        <div className="space-x-4">
                            <Link
                                href="/dashboard/refer-users"
                                className={cn(buttonVariants({ size: "lg" }))}
                            >
                                Started for free
                            </Link>
                        </div>
                        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                            Refer your friends, earn credits. It's that simple.
                        </p>
                    </div>
                </section>
                {/* <div className="grid gap-6">
                    <h3 className="text-xl font-bold sm:text-2xl text-center">
                        What&apos;s included
                    </h3>
                    <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> Save
                            generations
                        </li>
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> Premium
                            support by email
                        </li>

                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> Commercial
                            usage of photos
                        </li>
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> Premium
                            templates
                        </li>
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> Request new
                            features
                        </li>
                        <li className="flex items-center">
                            <Icons.check className="mr-2 h-4 w-4" /> Early
                            access to new features
                        </li>
                    </ul>
                </div> */}
            </div>
        </DashboardShell>
    )
}
