import { Icons } from "@/components/icons"
import VideoSection from "@/components/page/Video"
// import { Testimonials } from "@/components/testimonials"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import {
  FileInput,
  FileMinus,
  Save,
  SlidersHorizontal,
  Palette,
  Camera
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 60

async function getImageGenerations() {
  try {
    return (await db.outputImage.count()).toLocaleString()
  } catch (error) {
    return null
  }
}
export default async function IndexPage() {
  // const imageGenerations = await getImageGenerations()

  const featuredCardData = [
    {
      image: "/sine-background.png",
      title: "Backgrounds",
      prompts: [
        "Snow-capped peaks",
        "cozy cabin",
        "lush green landscape",
      ],
      imageAlt: "Image showing a cozy cabin with snow",
    },
    {
      image: "/warhammer.png",
      title: "Fantasy RPG",
      prompts: ["Warhammer 40k", "space marine", "galactic"],
      imageAlt: "Image showing a warhammer character portrait pixelated",
    },
    {
      image: "/examples/skillArt/frostbolt4.png",
      title: "32x32 Skill Art",
      prompts: ["Frostbolt", "frigid air", "shades of blue and white"],
      imageAlt: "Image showing a frostbolt skill art pixelated",
    },
    {
      image: "/energy.png",
      title: "16x16 Pixel Portraits",
      prompts: [
        "otherworldly avatar",
        "glowing eyes",
        "neon energy",
        "ethereal form",
      ],
      imageAlt: "16 bit cyberpunk robot portrait",
    },
  ]

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          {/* {imageGenerations && (
                        <Badge variant="secondary">
                            {imageGenerations.toLocaleString()} images generated
                            and counting!
                        </Badge>
                    )} */}
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Create NFT Art with Artificial Intelligence
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {siteConfig.description}
          </p>
          <div className="space-x-4">
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get started
            </Link>
            {/* <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                    size: "lg",
                                })
                            )}
                        >
                            GitHub
                        </Link> */}
          </div>
        </div>
      </section>
      <section
        id="examples"
        className="container dark:bg-transparent"
      >
        <VideoSection></VideoSection>
      </section>

      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Sine is packed with features to help you create the
            pixel art you want with ease.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.imagePlus size={48} />
              <div className="space-y-2">
                <h3 className="font-bold">AI Sketch Refine</h3>
                <p className="text-sm text-muted-foreground">
                  Easily sketch your ideas and creativity with a mouse, and leave the rest to AI.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Camera size={48} />
              <div className="space-y-2">
                <h3 className="font-bold">
                  AI NFT Generator
                </h3>
                <p className="text-sm text-muted-foreground">
                  Utilizes AI to create stunning pixel art images specifically for NFTs.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.grid size={48} />
              <div className="space-y-2">
                <h3 className="font-bold">Prompt Builder</h3>
                <p className="text-sm text-muted-foreground">
                  GPT-4 powered prompt builder to help you
                  create stunning images.
                </p>
              </div>
            </div>
          </div>


          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <SlidersHorizontal size={48} />
              <div className="space-y-2">
                <h3 className="font-bold">Advanced Tuning</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced options for adjusting sampling
                  steps and prompt guidance.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FileMinus size={48} />
              <div className="space-y-2">
                <h3 className="font-bold">Remove background</h3>
                <p className="text-sm text-muted-foreground">
                  Isolate the subject of your image by
                  removing the background!
                </p>
              </div>
            </div>
          </div>

          {/* <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Camera size={48} />
              <div className="space-y-2">
                <h3 className="font-bold">
                  AI Photographer
                </h3>
                <p className="text-sm text-muted-foreground">
                  Create beautiful AI photos without using a camera.
                </p>
              </div>
            </div>
          </div> */}
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Palette size={48} />
              <div className="space-y-2">
                <h3 className="font-bold">
                  Color palette control
                </h3>
                <p className="text-sm text-muted-foreground">
                  Constrain your generated image to a specific
                  color palette.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Testimonials /> */}

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
    </>
  )
}
