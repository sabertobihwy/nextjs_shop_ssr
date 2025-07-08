"use client"
import { useAuthStore } from "@/Zustandstore/authStore"
import { useEffect } from "react"
import { UserPublic } from "@/types/entities/User"

export default function AccountPageClient({ user }: { user: UserPublic }) {
    const setUser = useAuthStore(s => s.setUser)

    useEffect(() => {
        setUser(user)
    }, [user, setUser])


    return <>{user.username}</>
}