"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";

// // 浏览器全局单例，避免 Provider 重挂载时丢缓存
// const getClient = (() => {
//     let client: QueryClient | null = null
//     return () => {
//         if (!client) {
//             client = new QueryClient({
//                 defaultOptions: {
//                     queries: {
//                         // —— 建议的默认策略 —— //
//                         staleTime: 5 * 60 * 1000,   // 5min 内视为“新鲜”，挂载不重取
//                         gcTime: 30 * 60 * 1000,     // v5: 代替 cacheTime，30min 无引用才回收
//                         refetchOnMount: false,      // 就算是 stale，也别在挂载时立刻重取
//                         refetchOnWindowFocus: false,
//                         refetchOnReconnect: false,
//                         retry: 1,
//                     },
//                 },
//             })
//         }
//         return client
//     }
// })()

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    const [client] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: 1,
                    },
                },
            })
    );
    // const client = getClient()

    return (
        <QueryClientProvider client={client}>
            {children}
            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
}
