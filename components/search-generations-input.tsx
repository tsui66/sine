"use client"

import { Input } from "@/components/ui/input"
import { searchString } from "@/lib/utils"
import { searchGenerationsSchema } from "@/lib/validations/search-generations"
import { zodResolver } from "@hookform/resolvers/zod"
import va from "@vercel/analytics"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

type FormData = z.infer<typeof searchGenerationsSchema>

export const SearchGenerationsInput = () => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const search = decodeURIComponent(searchParams?.get("search") ?? "")

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(searchGenerationsSchema),
        defaultValues: {
            input: search ?? "",
        },
    })

    async function onSubmit(data: FormData) {
        if (data.input) {
            va.track("generationsSearched", {
                input: data.input,
            })
        }

        router.push(`/dashboard/generations?${searchString("1", data.input)}`)
        router.refresh()
    }

    return (
        <form
            className="w-full lg:max-w-[24rem]"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input {...register("input")} placeholder="Search generations..." />
        </form>
    )
}
