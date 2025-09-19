"use client"

import { generateCdn_theme_url } from "@/constants/theme"
import AboutRemoteContainer from "@/containers/AboutContainer"
import { useTheme } from "@/redux/hooks/useTheme"

export default function AboutController({ data }: { data: unknown }) {
    const { themeCdnMap, themeName } = useTheme()
    const url = generateCdn_theme_url(themeCdnMap[`${themeName}-about-index`])
    const params = {
        url,
        data
    }
    return (<AboutRemoteContainer {...params} />)
}