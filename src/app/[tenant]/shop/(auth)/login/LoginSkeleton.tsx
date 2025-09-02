"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function LoginSkeleton() {
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

            {/* 登录按钮 */}
            <Skeleton className="h-10 w-full rounded-md" />

            {/* 状态提示占位 */}
            <Skeleton className="h-4 w-2/3 mx-auto" />

            {/* 注册链接 */}
            <div className="flex justify-center">
                <Skeleton className="h-4 w-28" />
            </div>
        </div>
    )
}