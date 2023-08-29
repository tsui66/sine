import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardSettingsLoading() {
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Refer users"
                text="Refer your friends, earn credits. It's that simple."
            ></DashboardHeader>
            <div className="grid gap-10">
                <CardSkeleton />
            </div>
        </DashboardShell>
    )
}
