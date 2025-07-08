"use client"
import { ErrorCode } from '@/types/shared/error-code'
import { errorMessageMap } from '@/types/shared/error-message-map'
import { useSearchParams } from 'next/navigation'

export default function Page() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code') as unknown as ErrorCode
    const httpcode = searchParams.get('httpcode')
    console.log('输出code' + code)
    return (
        <div style={{ padding: '2rem' }}>
            <h1>页面无法访问</h1>
            <p>{errorMessageMap[code]}</p>
            <p>{httpcode ? `httpcode = ${httpcode}` : ''}</p>
        </div>
    )
}
