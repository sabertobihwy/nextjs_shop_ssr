'use client'

import { useState } from 'react'

export type StatusType = 'idle' | 'loading' | 'success' | 'error'

/**
 * Hook + UI 一体：用于统一处理异步操作状态和展示提示文本
 */
export function useStatus() {
    const [status, setStatus] = useState<StatusType>('idle')
    const [message, setMessage] = useState<string | null>(null)

    return {
        status,
        message,

        setLoading: (msg: string) => {
            setStatus('loading')
            setMessage(msg)
        },

        setSuccess: (msg: string) => {
            setStatus('success')
            setMessage(msg)
        },

        setError: (msg: string) => {
            setStatus('error')
            setMessage(msg)
        },

        reset: () => {
            setStatus('idle')
            setMessage(null)
        },
    }
}

/**
 * 状态提示组件，内置占位防止 CLS 跳动
 */
export function StatusHint({
    status,
    message,
    className = '',
}: {
    status: StatusType
    message: string | null
    className?: string
}) {
    return (
        <div className={`min-h-[1rem] ${className}`}>
            {status === 'loading' && (
                <p className="text-blue-500 text-sm">🔄 {message}</p>
            )}
            {status === 'error' && (
                <p className="text-red-500 text-sm">❌ {message}</p>
            )}
            {status === 'success' && (
                <p className="text-green-600 text-sm">✅ {message}</p>
            )}
        </div>
    )
}
