import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "All tools",
            href: "/tools",
        },
        {
            title: "Earn credits",
            href: "/dashboard/refer-users",
        },
    ],
    sidebarNav: [
        {
            title: "Create",
            href: "/tools",
            icon: "terminal",
        },
        {
            title: "Generations",
            href: "/dashboard/generations",
            icon: "imagePlus",
        },
        {
            title: "Refer & Earn",
            href: "/dashboard/refer-users",
            icon: "userPlus",
        },
        {
            title: "Buy credits",
            href: "/credits",
            icon: "billing",
        },
        // {
        //     title: "Settings",
        //     href: "/dashboard/settings",
        //     icon: "settings",
        // },
    ],
}
