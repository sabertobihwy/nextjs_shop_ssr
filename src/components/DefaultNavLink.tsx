import { HeaderLinkItem } from "@/lib/constants"
import Link from "next/link"

export default async function DefaultNavLink({ href, name, icon }: HeaderLinkItem) {
    return (<>
        <Link href={href} className="text-lg flex gap-2">
            {icon}
            {name}
        </Link>

    </>)
} 