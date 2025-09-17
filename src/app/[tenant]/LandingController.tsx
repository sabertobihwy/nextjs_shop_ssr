"use client"

import { generateCdn_theme_url } from "@/constants/theme"
import LandingRemoteContainer from "@/containers/LandingConainer"
import { useTheme } from "@/redux/hooks/useTheme"

export default function LandingController({ data }: { data: unknown }) {
    const { themeCdnMap, themeName } = useTheme()
    const url = generateCdn_theme_url(themeCdnMap[`${themeName}-landing-index`])
    const params = {
        url,
        data
    }
    return (<LandingRemoteContainer {...params} />)
}