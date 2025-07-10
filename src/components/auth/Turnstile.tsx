'use client'

import { useEffect, useRef } from 'react'
declare global {
    interface Window {
        turnstile: {
            render: (
                container: HTMLElement | string,
                options: {
                    sitekey: string
                    callback: (token: string) => void
                    theme: string
                }
            ) => void
            reset?: () => void
            remove?: () => void
        }
    }
}
export default function TurnstileCheck({ onSuccess }: { onSuccess: (token: string) => void }) {
    const ref = useRef<HTMLDivElement>(null)
    const rendered = useRef(false) // 👈 控制只 render 一次

    useEffect(() => {
        const existingScript =
            document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')

        const render = () => {
            //  console.log('👁sitekey', process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
            if (rendered.current) return
            //  console.log(`ref.current: ${ref.current} ; window.turnstile: ${window.turnstile}`)
            if (ref.current && window.turnstile) {
                //  console.log('ok')
                window.turnstile.render(ref.current, {
                    sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
                    callback: onSuccess,
                    theme: 'light'
                })
            }
            rendered.current = true
        }

        if (!existingScript) {
            const script = document.createElement('script')
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
            script.async = true
            script.onload = render
            document.body.appendChild(script)
        } else {
            // console.log('isLoaded')
            if (window.turnstile) {
                render()
            } else {
                existingScript.addEventListener('load', render)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<div className="checkbox mb-5">
        <div ref={ref} ></div>
    </div>)



}
