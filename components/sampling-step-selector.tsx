"use client"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { SliderProps } from "@radix-ui/react-slider"
import * as React from "react"

interface TemperatureSelectorProps {
    defaultValue: SliderProps["defaultValue"]
    onValueChange: SliderProps["onValueChange"]
    value: SliderProps["value"]
}

export function SamplingStepSelector({
    defaultValue,
    onValueChange,
    value,
}: TemperatureSelectorProps) {
    // const [value, setValue] = React.useState(defaultValue)

    return (
        <div className="grid gap-2 ">
            <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="temperature">Sampling steps</Label>
                            <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                                {value}
                            </span>
                        </div>
                        <Slider
                            id="temperature"
                            max={100}
                            min={10}
                            defaultValue={defaultValue}
                            value={value}
                            step={1}
                            onValueChange={onValueChange}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                            aria-label="Temperature"
                        />
                    </div>
                </HoverCardTrigger>
                <HoverCardContent
                    align="start"
                    className="w-[260px] text-sm"
                    side="left"
                >
                    Higher steps are good for highly detailed images and will
                    take longer, lower steps will add fewer extra details. The
                    default is 50.
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}
