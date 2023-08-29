import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Tool } from "@/lib/tools"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  Aperture,
  FileCog2,
} from "lucide-react"

export const metadata = {
  title: "All tools",
  description: "View all tools",
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {

  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tools: Tool[] = []

  const allTools = [
    {
      name: "AI Sketch Refine",
      description:
        "Turn your rough sketch into a refined image using AI.",
      icon: <FileCog2 />,
      link: "/tools/sketch",
    },
    {
      name: "AI NFT Generator ",
      description:
        "Utilizes AI to create stunning pixel art images specifically for NFTs.",
      icon: <Aperture />,
      link: "/tools/nft-generator",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading="All tools"
        text="View all tools powered AI"
      >
        {/* <SearchGenerationsInput /> */}
      </DashboardHeader>
      <div className="mt-2 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2">
        {allTools.map((tool, idx) => (
          <div
            key={idx}
            className="p-5 shadow rounded-[12px] dark:shadow-slate-900"
          >
            <Link
              href={tool.link}
              className="flex flex-row items-center gap-2 text-2xl font-bold tracking-tight"
            >
              <span className="text-red-500 dark:text-red-700">
                {tool.icon}
              </span>
              <div className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
                {tool.name}
              </div>
            </Link>
            <p className="ml-8 mt-2 text-muted-foreground">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
