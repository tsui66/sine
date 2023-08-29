"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { downloadImage } from "@/lib/client-helpers"
import va from "@vercel/analytics"
import { Download, ImageMinus, MoreVertical, Twitter, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface IImageOPtions {
    imageId: string
    src: string
    name: string
    dsiableRemoveBG?: boolean
}

export function ImageOptions({ imageId, src, name, dsiableRemoveBG }: IImageOPtions) {
    const { toast } = useToast()
    const router = useRouter()

    const removeImageBackground = async (e: any) => {
        va.track("removeBackgroundSelected", {
            imageId,
            src,
            name,
        })

        toast({
            title: "Removing the background from your image",
            description:
                "In a moment, your image will be ready to download from your generations page.",
            variant: "default",
        })

        const response = await fetch("/api/images/remove-background", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                imageId,
            }),
        })

        if (!response.ok) {
            if (response.status === 429) {
                return toast({
                    title: "Too many requests",
                    description:
                        "You have gone over your limit for requests to generate prompts. Try again in a second.",
                    variant: "destructive",
                })
            } else {
                throw new Error(response.statusText)
            }
        }

        const removedImage = await response.json()
        router.refresh()
        toast({
            title: "Background removed!",
            description: "The background from your image has been removed.",
            action: (
                <ToastAction altText="Goto image to view">
                    <Link href={`/i/${removedImage.id}`}>View</Link>
                </ToastAction>
            ),
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"secondary"} className="w-full" size="sm">
                    <MoreVertical size={16} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Image options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => downloadImage(src, name)}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                    </DropdownMenuItem>
                    {dsiableRemoveBG && <DropdownMenuItem onSelect={removeImageBackground}>
                        <ImageMinus className="mr-2 h-4 w-4" />
                        <span>Remove Background</span>
                    </DropdownMenuItem>}
                    <DropdownMenuItem
                        onSelect={() => {
                            va.track("shareImageSelected", {
                                imageId,
                                name,
                                src,
                            })
                        }}
                    >
                        <a
                            className="inline-flex"
                            rel="noopener noreferrer"
                            target="_blank"
                            href={`https://twitter.com/intent/tweet?text=Check out my pixel art image generated by AI on Sine&url=${`https://www.sine.at/i/${imageId}`}&via=tsui_nova`}
                        >
                            <Twitter className="mr-2 h-4 w-4" />
                            <span>Share on Twitter</span>
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
