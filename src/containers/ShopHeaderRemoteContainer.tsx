"use client";

import { useRemoteComponent } from "@/hooks/useRemoteComponent";
import { LinkComponent } from "@/components/LinkComponent";
import ShopHeaderSkeleton from "@/components/skeleton/productDisplay/ShopHeaderSkeleton";
import { SafeUser } from "@/types/entities/User";

export default function HeaderRemoteContainer({ url, user }: { url: string, user: SafeUser | null, }) {
    const { Comp, loading, error } = useRemoteComponent({
        url,
        // Header 这种没有 schemaProps，直接不传 validatedProps 就行
    });

    if (error) return <div>加载失败</div>;
    if (loading || !Comp) return <ShopHeaderSkeleton />;

    const dbProps = {
        userDropDownProps: {
            linkComponent: LinkComponent,
            content:
                user ?
                    {
                        companyName: user.username,
                        userRole: user.role,
                        items: [
                            { label: "Settings", href: "/settings" },
                            { label: "Sign Out", href: "/signout" },
                        ],
                    }
                    : undefined
            ,
        },
    };

    return <Comp dbProps={dbProps} />;
}