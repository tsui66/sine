import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardSettingsLoading() {
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Tools"
                text="View all tools powered AI"
            />
            <div className="grid grid-cols-2 gap-10">
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </DashboardShell>
    )
}
