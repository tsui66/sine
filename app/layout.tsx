import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import { absoluteUrl, cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-satoshi",
})

// Font files can be colocated inside of `pages`：q
const fontHeading = localFont({
    src: "../assets/fonts/Satoshi-Variable.woff2",
    variable: "--font-heading",
})

interface RootLayoutProps {
    children: React.ReactNode
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const metadata = {
    title: {
        default: `${capitalizeFirstLetter(siteConfig.name)} | Create NFT Art with Artificial Intelligence`,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        "Pixel Art",
        "NFT",
        "AI",
        "NFT Art AI Generation",
        "Pixels",
        "AI generated",
    ],
    authors: [
        {
            name: "Tsui",
            url: "https://github.com/tsui-66",
        },
    ],
    creator: "Tsui",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [`${siteConfig.url}/sine-og.png`],
        creator: "@tsui-66",
    },
    icons: {
        icon: "/favicon.png",
        shortcut: "/favicon.png",
        apple: "/favicon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                    fontHeading.variable
                )}
            >
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-MDVWXRQVWK" />
                <Script id="google-analytics">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', 'G-MDVWXRQVWK');
                    `}
                </Script>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                >
                    {/* <div className="w-full flex justify-center items-center py-2 px-4 text-center bg-primary-foreground">
                        <span className="text-sm">
                            🎉 Limited time Memorial Day special! Enter code{" "}
                            <strong>MEMORIALDAY</strong> for 50% off platform
                            credits.
                        </span>
                    </div> */}
                    {children}
                    <Analytics />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
