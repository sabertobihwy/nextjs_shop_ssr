"use client"
import { useEffect } from "react"
import { UserPublic } from "@/types/entities/User"
import { useAuth } from "@/redux/hooks/useAuth"

export default function AccountPageClient({ user }: { user: UserPublic }) {
    const { setUser } = useAuth()
    useEffect(() => {
        setUser(user)
    }, [user, setUser])


    return <>{user.username}</>
}