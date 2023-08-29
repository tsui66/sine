import { DownloadImageButton } from "@/components/download-image-button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { GenerationPagePagination } from "@/components/generations-pagination"
import { DashboardHeader } from "@/components/header"
import { ImageOptions } from "@/components/image-options"
import { RemoveBackgroundButton } from "@/components/remove-background-button"
import { SearchGenerationsInput } from "@/components/search-generations-input"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { authOptions } from "@/lib/auth"
import { getUserGenerations, preloadGenerations } from "@/lib/generations"
import { getCurrentUser } from "@/lib/session"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata = {
    title: "Generations",
    description: "View all of your past generations",
}

export default async function GenerationPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) {
    const page = parseInt(searchParams?.page ?? "1") ?? 1

    const search = searchParams?.search ?? undefined

    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions?.pages?.signIn || "/login")
    }

    preloadGenerations({ search, page: page + 1 })

    const generationQuery = getUserGenerations({ page, search })

    const generatedImages = await generationQuery

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Generations"
                text="View all of your generations here"
            >
                {/* <SearchGenerationsInput /> */}
            </DashboardHeader>
            {generatedImages?.length ? (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {generatedImages.map((generatedImage) => (
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <div className="relative rounded-lg overflow-hidden border">
                                        <div className="absolute top-2 right-2 z-10">
                                            <ImageOptions
                                                name={generatedImage.seed || ''}
                                                imageId={generatedImage.id}
                                                dsiableRemoveBG={!!generatedImage.scenarioImageId}
                                                src={
                                                    generatedImage.pixelatedImage
                                                }
                                            />
                                        </div>
                                        <Link
                                            href={`/i/${generatedImage.id}`}
                                            className={`rounded-lg  overflow-hidden`}
                                            key={generatedImage.id}
                                        >
                                            <Image
                                                unoptimized
                                                alt={
                                                    generatedImage.generation
                                                        .prompt
                                                }
                                                height={512}
                                                width={512}
                                                src={
                                                    generatedImage.pixelatedImage
                                                }
                                            />
                                        </Link>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <p className="text-sm text-primary">
                                        {generatedImage.generation.prompt}
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                        ))}
                    </div>
                    {/* @ts-expect-error */}
                    <GenerationPagePagination page={page} search={search} />
                </>
            ) : (
                <>
                    {search ? (
                        <EmptyPlaceholder>
                            <EmptyPlaceholder.Icon name="terminal" />
                            <EmptyPlaceholder.Title>
                                No generations match your search term
                            </EmptyPlaceholder.Title>
                            <EmptyPlaceholder.Description className="mb-0 pb-0">
                                Try refining your search term
                            </EmptyPlaceholder.Description>
                        </EmptyPlaceholder>
                    ) : (
                        <EmptyPlaceholder>
                            <EmptyPlaceholder.Icon name="terminal" />
                            <EmptyPlaceholder.Title>
                                No generations created
                            </EmptyPlaceholder.Title>
                            <EmptyPlaceholder.Description>
                                You don&apos;t have any generations yet. Start
                                creating images!
                            </EmptyPlaceholder.Description>
                            <Link href="/dashboard">
                                <Button>Start creating</Button>
                            </Link>
                        </EmptyPlaceholder>
                    )}
                </>
            )}
        </DashboardShell>
    )
}
