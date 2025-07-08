// deprecated
export async function serverFetch(input: string, init?: RequestInit): Promise<Response> {
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const url = `${origin}${input}`

    return fetch(url, {
        ...init
    })
}
