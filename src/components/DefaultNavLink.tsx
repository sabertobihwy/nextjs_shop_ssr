import { HeaderLinkItem } from "@/constants/headerLinks"
import SmartNavLink from "./tenant/SmartNavLink"

export default function DefaultNavLink({
    href, name, icon = '', className = '', tenantName,
}: HeaderLinkItem) {
    return (
        <SmartNavLink tenantName={tenantName} href={href} className={`text-lg flex gap-2 ${className}`}>
            {icon}{name}
        </SmartNavLink>
    )
}