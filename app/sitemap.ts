import { db } from "@/lib/db"
// import { scenarioModelData } from "@/lib/generators"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const images = await db.outputImage.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  })

  // const examplesSitemapEntry = Object.keys(scenarioModelData).map((style) => {
  //   return {
  //     url: `https://sine.at/examples/${scenarioModelData[style].slug}`,
  //     lastModified: new Date(),
  //   }
  // })

  const imageSitemapEntry = images.map((image) => {
    return {
      url: `https://sine.at/i/${image.id}`,
      lastModified: image.updatedAt,
    }
  })

  return [
    {
      url: "https://sine.at",
      lastModified: new Date(),
    },
    {
      url: "https://sine.at/tos",
      lastModified: new Date(),
    },
    {
      url: "https://sine.at/privacy-policy",
      lastModified: new Date(),
    },
    // ...examplesSitemapEntry,
    ...imageSitemapEntry,
  ]
}
