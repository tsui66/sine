import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { normalizedGeneratorMap } from "@/lib/generators"
import { formatDistanceToNowStrict } from "date-fns"
import type { Metadata } from "next"
import Image from "next/image"

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
    params: { id: photoId },
}: Props): Promise<Metadata> {
    const photo = await db.outputImage.findUniqueOrThrow({
        where: {
            id: photoId,
        },
        include: {
            generation: true,
        },
    })

    return {
        title:
            photo?.generation.prompt?.length > 45
                ? photo?.generation.prompt?.slice(0, 45) + "..."
                : photo?.generation.prompt,
        description:
            "Create NFT Art with Artificial Intelligence. If you want to generate your own, try Sine.",
        openGraph: {
            title:
                photo?.generation.prompt?.length > 45
                    ? photo?.generation.prompt?.slice(0, 45) + "..."
                    : photo?.generation.prompt,
            description:
                "Create NFT Art with Artificial Intelligence. If you want to generate your own, try Sine.",
            images: [photo?.pixelatedImage ?? ""],
        },
        twitter: {
            card: "summary_large_image",
            title:
                photo?.generation.prompt?.length > 45
                    ? photo?.generation.prompt?.slice(0, 45) + "..."
                    : photo?.generation.prompt,
            description:
                "Create NFT Art with Artificial Intelligence. If you want to generate your own, try Sine.",
            images: [photo?.pixelatedImage ?? ""],
            creator: "@tsui_nova",
        },
    }
}

export default async function GenerationModal({ params: { id: imageId } }) {
    const image = await db.outputImage.findUniqueOrThrow({
        where: {
            id: imageId,
        },
        include: {
            generation: {
                select: {
                    prompt: true,
                    numInferenceSteps: true,
                    guidance: true,
                    modelId: true,
                },
            },
        },
    })
    return (
        <DashboardShell>
            <div className="container mx-auto w-full flex flex-col items-center justify-center dark:bg-transparent mt-16">
                {image && (
                    <div className="flex overflow-hidden rounded-md">
                        <Image
                            priority
                            unoptimized
                            className="rounded-lg overflow-hidden"
                            height={512}
                            width={512}
                            alt={image?.generation.prompt}
                            src={image?.image!}
                        />
                        <Image
                            priority
                            unoptimized
                            className="rounded-lg overflow-hidden"
                            height={512}
                            width={512}
                            alt={image?.generation.prompt}
                            src={image?.pixelatedImage}
                        />

                    </div>
                )}
                <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem] text-center mt-8 pb-24">
                    <span>
                        Created {formatDistanceToNowStrict(image.createdAt)} ago
                    </span>
                    <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                        {image?.generation.prompt}
                    </h1>
                    <div className="flex gap-2 flex-wrap justify-center w-full mt-6">
                        <Badge variant="secondary">
                            {normalizedGeneratorMap[image?.generation?.modelId]}
                        </Badge>
                        <Badge variant="outline">
                            {image?.generation?.numInferenceSteps} sampling
                            steps
                        </Badge>
                        <Badge variant="outline">
                            {image?.generation?.guidance} guidance
                        </Badge>
                    </div>
                    <div className="w-full mx-auto flex justify-center mt-4">
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={`https://twitter.com/intent/tweet?text=Check out my pixel art image generated by AI on Sine&url=${`https://www.sine.at/i/${image?.id}`}&via=tsui_nova`}
                        >
                            <Button
                                // variant="outline"
                                className="gap-2 inline-flex"
                            >
                                <Icons.twitter size={16} />
                                Share on Twitter
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </DashboardShell>
    )
}
