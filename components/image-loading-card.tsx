"use client"

import { AspectRatio } from "./ui/aspect-ratio"
import { Progress } from "./ui/progress"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type LinearGradientProps = React.HTMLAttributes<HTMLOrSVGElement> & {
    height?: number
    width?: number
}
const LinearGradient = ({
    height = 80,
    width = 317,
    className,
    ...props
}: LinearGradientProps) => {
    const path =
        "M316 0V10C316 12.2091 314.209 14 312 14H5C2.79086 14 1 15.7909 1 18V80"

    return (
        <svg
            {...props}
            className={cn(`absolute text-primary-foreground`, className)}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
        >
            <path d={path} stroke="currentColor" strokeOpacity="0.2" />
            <path
                d={path}
                stroke="url(#pulse-1)"
                strokeLinecap="round"
                strokeWidth="2"
            />
            <defs>
                <motion.linearGradient
                    animate={{
                        x1: [0, width * 2],
                        x2: [0, width],
                        y1: [height, height / 2],
                        y2: [height * 2, height],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                    id="pulse-1"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop
                        className="text-muted-foreground"
                        stopColor="currentColor"
                        stopOpacity="0"
                    />
                    <stop
                        className="text-muted-foreground"
                        stopColor="currentColor"
                    />
                    <stop offset="1" stopColor="#FFF" stopOpacity="0" />
                </motion.linearGradient>
            </defs>
        </svg>
    )
}

export const GridBackground = () => {
    return (
        <svg
            className="w-full text-card-foreground"
            height="258"
            viewBox="0 0 392 258"
            width="392"
        >
            <g opacity="0.1" stroke="currentColor" strokeDasharray="1 1">
                <line x2="392" y1="15.5" y2="15.5"></line>
                <line x2="392" y1="31.5" y2="31.5"></line>
                <line x2="392" y1="47.5" y2="47.5"></line>
                <line x2="392" y1="63.5" y2="63.5"></line>
                <line x2="392" y1="79.5" y2="79.5"></line>
                <line x2="392" y1="95.5" y2="95.5"></line>
                <line x2="392" y1="111.5" y2="111.5"></line>
                <line x2="392" y1="127.5" y2="127.5"></line>
                <line x2="392" y1="143.5" y2="143.5"></line>
                <line x2="392" y1="159.5" y2="159.5"></line>
                <line x2="392" y1="175.5" y2="175.5"></line>
                <line x2="392" y1="191.5" y2="191.5"></line>
                <line x2="392" y1="207.5" y2="207.5"></line>
                <line x2="392" y1="223.5" y2="223.5"></line>
                <line x2="392" y1="239.5" y2="239.5"></line>
                <line x2="392" y1="255.5" y2="255.5"></line>
                <line
                    x1="11.9999"
                    x2="11.9999"
                    y1="2.18557e-08"
                    y2="256"
                ></line>
                <line
                    x1="27.9999"
                    x2="27.9999"
                    y1="2.18557e-08"
                    y2="256"
                ></line>
                <line
                    x1="43.9999"
                    x2="43.9999"
                    y1="2.18557e-08"
                    y2="256"
                ></line>
                <line
                    x1="59.9999"
                    x2="59.9999"
                    y1="2.18557e-08"
                    y2="256"
                ></line>
                <line
                    x1="75.9999"
                    x2="75.9999"
                    y1="2.18557e-08"
                    y2="256"
                ></line>
                <line
                    x1="91.9999"
                    x2="91.9999"
                    y1="2.18557e-08"
                    y2="256"
                ></line>
                <line x1="108" x2="108" y1="2.18557e-08" y2="256"></line>
                <line x1="124" x2="124" y1="2.18557e-08" y2="256"></line>
                <line x1="140" x2="140" y1="2.18557e-08" y2="256"></line>
                <line x1="156" x2="156" y1="2.18557e-08" y2="256"></line>
                <line x1="172" x2="172" y1="2.18557e-08" y2="256"></line>
                <line x1="188" x2="188" y1="2.18557e-08" y2="256"></line>
                <line x1="204" x2="204" y1="2.18557e-08" y2="256"></line>
                <line x1="220" x2="220" y1="2.18557e-08" y2="256"></line>
                <line x1="236" x2="236" y1="2.18557e-08" y2="256"></line>
                <line x1="252" x2="252" y1="2.18557e-08" y2="256"></line>
                <line x1="268" x2="268" y1="2.18557e-08" y2="256"></line>
                <line x1="284" x2="284" y1="2.18557e-08" y2="256"></line>
                <line x1="300" x2="300" y1="2.18557e-08" y2="256"></line>
                <line x1="316" x2="316" y1="2.18557e-08" y2="256"></line>
                <line x1="332" x2="332" y1="2.18557e-08" y2="256"></line>
                <line x1="348" x2="348" y1="2.18557e-08" y2="256"></line>
                <line x1="364" x2="364" y1="2.18557e-08" y2="256"></line>
                <line x1="380" x2="380" y1="2.18557e-08" y2="256"></line>
            </g>
        </svg>
    )
}

const PixelLoadingAnimation = () => {
    return (
        <div className="border ">
            <motion.svg
                animate={{
                    scale: [0.5, 1, 1, 0.75, 0.5],
                    rotate: [0, 0, 270, 270, 0],
                    opacity: [0, 0.2, 1, 1, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                }}
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 m-auto flex text-muted-foreground z-10 "
            >
                <path d="M16.4999 22.155C14.5049 22.155 12.8174 20.385 11.9999 17.4225L9.13485 7.38749C8.59485 5.48249 7.78485 4.83749 7.49985 4.83749C7.21485 4.83749 6.40485 5.48249 5.86485 7.38749L4.43985 12.405C4.38617 12.5946 4.29568 12.7718 4.17353 12.9264C4.05138 13.081 3.89998 13.2101 3.72796 13.3062C3.55594 13.4023 3.36667 13.4636 3.17097 13.4865C2.97526 13.5095 2.77695 13.4937 2.58735 13.44C2.39776 13.3863 2.22059 13.2958 2.06597 13.1737C1.91135 13.0515 1.7823 12.9001 1.68619 12.7281C1.59008 12.5561 1.52879 12.3668 1.50583 12.1711C1.48287 11.9754 1.49867 11.7771 1.55235 11.5875L2.99985 6.56999C3.83985 3.60749 5.52735 1.83749 7.49985 1.83749C9.47235 1.83749 11.1824 3.60749 11.9999 6.56999L14.8424 16.605C15.3824 18.51 16.1924 19.155 16.4774 19.155C16.7624 19.155 17.5724 18.51 18.1124 16.605L19.5374 11.5875C19.6458 11.2046 19.9018 10.8804 20.2492 10.6863C20.5967 10.4922 21.0069 10.4441 21.3899 10.5525C21.7728 10.6609 22.0969 10.917 22.291 11.2644C22.4851 11.6118 22.5333 12.0221 22.4249 12.405L20.9999 17.43C20.1824 20.3925 18.4949 22.155 16.4999 22.155Z" fill="currentColor" />
                {/* <path d="M32 32H40V40H32V32Z" fill="currentColor" /> */}
            </motion.svg>
        </div>
    )
}

interface IImageLoadingCard {
    showLoadingText?: boolean
}

export const ImageLoadingCard = ({
    showLoadingText = true,
}: IImageLoadingCard) => {
    return (
        <AspectRatio ratio={1 / 1}>
            <Card className="h-full w-full flex items-center justify-center rounded-lg overflow-hidden relative">
                <CardContent className="overflow-hidden flex flex-col w-full relative p-0 items-center">
                    <PixelLoadingAnimation />
                    <div className="w-[392px] h-[258px] flex-shrink-0 relative mb-0 mt-[2px]">
                        {/* <LinearGradient className="left-0 bottom-0" />
                    <LinearGradient className="right-0 top-0 rotate-180" /> */}

                        {/* <LinearGradient className="left-0 top-0 -rotate-90" />
                    <LinearGradient className="right-0 bottom-0 rotate-90" /> */}
                        <GridBackground />
                    </div>
                </CardContent>
                {showLoadingText && (
                    <motion.span
                        animate={{
                            opacity: [0, 0.2, 1, 1, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                        }}
                        className="absolute top-2 left-4 m-auto flex text-muted-foreground z-10 "
                    >
                        Generating...
                    </motion.span>
                )}
            </Card>
        </AspectRatio>
    )
}
