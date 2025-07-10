import { HeaderLinkItem } from "@/constants/headerLinks"
import TenantLink from "./tenant/TenantLink"

export default function DefaultNavLink({ href, name, icon }: HeaderLinkItem) {
    return (<>
        <TenantLink href={href} className="text-lg flex gap-2">
            {icon}
            {name}
        </TenantLink>

    </>)
} 