import { loadTenantOrRedirect } from "@/lib/ssr/loadTenantOrRedirect";
import AboutController from "./AboutController";
// import { AboutMock } from "@/constants/TestMockAboutData";
import { ThemeOptionsEntity } from "@/types/entities/Theme";
import { loadThemeOrRedirect } from "@/lib/ssr/loadThemeOrRedirect";
import { redirect } from "next/navigation";
import { buildAccNoOrder } from "@/lib/service/server/cms/fetchPageDataService";

export const revalidate = 3600

export default async function Page({ params }: { params: Promise<{ tenant: string }> }) {

    const { tenant: tenantName } = await params
    const { tenantId } = await loadTenantOrRedirect(tenantName)
    const themeOptions: ThemeOptionsEntity = await loadThemeOrRedirect(tenantName, tenantId)

    const pageInstanceId = themeOptions.pageInstanceMap?.about
    if (!pageInstanceId) {
        console.error(`❌ ${tenantName} do not have the scene: about`)
        redirect(`/not-found?httpcode=500`);
    }
    const acc = await buildAccNoOrder(pageInstanceId);

    return <AboutController data={acc} />

}
