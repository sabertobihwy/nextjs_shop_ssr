"use client"

import { generateCdn_theme_url } from "@/constants/theme";
import ShopDetailRemoteContainer from "@/containers/ShopDetailContainer";
import { useTheme } from "@/redux/hooks/useTheme";
import { ProductDetailVO } from "@/types/entities/products";

const md = `
## Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua u t enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

- E-commerce: Better lorem ipsum generator.
- Booking: Lorem ipsum post generator.
- Retail: Better lorem ipsum generator.
- Services: Better lorem ipsum generator.

> “Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”
`
// ProductDetailVO 
export default function ShopDetailController({ detail }: { detail: ProductDetailVO }) {
    const { themeCdnMap, themeName } = useTheme()
    const url = generateCdn_theme_url(themeCdnMap[`${themeName}-shop-detail`])
    const params = {
        url,
        dbProps: {
            detail: {
                ...detail,
                overviewMD: md,
            },
            linkHref: '../', // back to home 
        }
    }
    return (<ShopDetailRemoteContainer {...params} />)
}