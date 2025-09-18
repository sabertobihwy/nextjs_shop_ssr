import LandingController from "./LandingController";
import { loadTenantOrRedirect } from "@/lib/ssr/loadTenantOrRedirect";
import { loadThemeOrRedirect } from "@/lib/ssr/loadThemeOrRedirect";
import { ThemeOptionsEntity } from "@/types/entities/Theme";
import { redirect } from "next/navigation";
import { buildAccNoOrder } from "@/lib/service/server/cms/fetchPageDataService";

export const revalidate = 3600

export default async function Page({ params }: { params: Promise<{ tenant: string }> }) {

    const { tenant: tenantName } = await params
    const { tenantId } = await loadTenantOrRedirect(tenantName)
    const themeOptions: ThemeOptionsEntity = await loadThemeOrRedirect(tenantName, tenantId)

    const pageInstanceId = themeOptions.pageInstanceMap?.landing
    if (!pageInstanceId) {
        console.error(`❌ ${tenantName} do not have the scene: landing`)
        redirect(`/not-found?httpcode=500`);
    }
    const acc = await buildAccNoOrder(pageInstanceId);

    return <LandingController data={acc} />

}
