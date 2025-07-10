"use client"
import { SafeUser } from "@/types/entities/User"

export default function AccountPageClient({ safeUser }: { safeUser: SafeUser }) {


    return <>{safeUser.username}</>
}