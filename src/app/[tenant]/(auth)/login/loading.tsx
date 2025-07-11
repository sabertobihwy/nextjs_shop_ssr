import { Skeleton } from "@/components/ui/skeleton"

export default async function Loading() {
    return (<div className='flex justify-between items-center w-full h-[700px]'>
        <div className="containerM w-[400px] py-5 border shadow-lg">
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
        </div>
    </div>)
}