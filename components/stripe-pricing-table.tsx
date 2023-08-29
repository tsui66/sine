"use client"

import { useTheme } from "next-themes"
import Head from "next/head"
import Script from "next/script"

type TStripePricingTable = {
    clientReferenceId: string
    customerEmail?: string | null
}
export const StripePricingTable = ({
    clientReferenceId,
    customerEmail,
}: TStripePricingTable) => {
    const { theme } = useTheme()

    return (
        <>
            <Script
                async
                src="https://js.stripe.com/v3/pricing-table.js"
            ></Script>

            {theme === "light" ? (
                <>
                    {/* @ts-ignore */}
                    <stripe-pricing-table
                        pricing-table-id="prctbl_1NiIACEw8BOFMlG2kymy9SW7"
                        publishable-key="pk_live_51NGdgGEw8BOFMlG28eq5PYYMii07yqYfjeahndv0KWMrbHqVCbEWARpE361tV9Ruuv5lyWgbEnAteUEPZkNZURjh00rRXgbZTV"
                        client-reference-id={clientReferenceId}
                        customer-email={customerEmail}
                    />
                </>
            ) : (
                <>
                    {/* @ts-ignore */}
                    <stripe-pricing-table
                        pricing-table-id="prctbl_1NiIU0Ew8BOFMlG2VwKCLwWU"
                        publishable-key="pk_live_51NGdgGEw8BOFMlG28eq5PYYMii07yqYfjeahndv0KWMrbHqVCbEWARpE361tV9Ruuv5lyWgbEnAteUEPZkNZURjh00rRXgbZTV"
                        client-reference-id={clientReferenceId}
                        customer-email={customerEmail}
                    />
                </>
            )}
        </>
    )
}
