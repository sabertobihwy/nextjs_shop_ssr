// import { UserPublic } from "@/types/entities/User"

// // Client-only：如 CSR 页面的 useEffect 中调用
// export async function getUserFromClient(tenantName: string): Promise<UserPublic | null> {
//     const resp = await fetch(`/${tenantName}/account/me`, {
//         credentials: 'include',
//         cache: 'no-store',
//     })

//     if (!resp.ok) return null
//     const result = await resp.json()
//     return result.data
// }