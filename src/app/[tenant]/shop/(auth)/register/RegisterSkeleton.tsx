"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function RegisterSkeleton() {

    return (
        <div className="space-y-8 max-w-md mx-auto mt-10">
            {/* 用户名 label + input */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* 密码 label + input */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Turnstile 骨架 + mb-5 */}
            <Skeleton className="h-20 w-full rounded-md mb-5" />

            {/* 提交按钮 */}
            <Skeleton className="h-10 w-full rounded-md" />

            {/* 状态提示占位 */}
            <Skeleton className="h-4 w-2/3 mx-auto" />

            {/* 跳转链接占位 */}
            <div className="flex justify-center">
                <Skeleton className="h-4 w-28" />
            </div>
        </div>
    )
}