// app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <>
        <SpeedInsights />
        {children}
    </>
}
