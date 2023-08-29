import { GenerationForm } from "@/components/create/generation-form"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export const metadata = {
    title: "AI NFT Generator",
}

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    return (
        <DashboardShell>
            <DashboardHeader
                heading="AI NFT Generator"
                text="Utilizes AI to create stunning pixel art images specifically for NFTs."
            >
                {/* <ModelSelectButton /> */}
            </DashboardHeader>

            <div className="mb-24">
                <GenerationForm
                    user={{
                        id: user.id,
                        name: user.name || "",
                        credits: user.credits,
                    }}
                />
            </div>
        </DashboardShell>
    )
}
