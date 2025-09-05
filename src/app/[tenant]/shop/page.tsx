import { ThemeOptionsEntity } from "@/types/entities/Theme"
import { redirect } from "next/navigation"
import { fetchSectionPropsByName } from "@/lib/service/server/cms/fetchSectionProps"
import { GetProductsOutput, getProductsService } from "@/lib/service/server/products/productService"
import { UUIDString } from "@/types/brand"
import { BizError } from "@/types/shared/BizError"
import { loadTenantOrRedirect } from "@/lib/ssr/loadTenantOrRedirect"
import { loadThemeOrRedirect } from "@/lib/ssr/loadThemeOrRedirect"
import ShopController from "@/app/[tenant]/shop/ShopController"
import { buildShopView } from "@/lib/service/server/products/buildShopView"

export const revalidate = 3600 // page cache 

export default async function Page({ params }: { params: Promise<{ tenant: string }> }) {
    // for test 
    // const wait5s = new Promise<void>((resolve) => {
    //     setTimeout(resolve, 5000);
    // });

    // await wait5s;
    // console.log("5 秒结束啦");


    const { tenant: tenantName } = await params
    const { tenantId } = await loadTenantOrRedirect(tenantName)
    const themeOptions: ThemeOptionsEntity = await loadThemeOrRedirect(tenantName, tenantId)

    const shopPageInstanceId = themeOptions.pageInstanceMap?.shop
    if (!shopPageInstanceId) {
        console.error(`❌ ${tenantName} do not have the scene: shop`)
        redirect(`/not-found?httpcode=500`);
    }
    // todo: should it be encapsulated into ssr/ ? 
    try {
        // get props from section_instance 
        const displayDefaultProps: unknown = await fetchSectionPropsByName(shopPageInstanceId, 'section_display')

        //  SSR Query 禁区：所有影响 SSR 商品查询的字段禁止出现在 sectionInstance.props 中
        const result: GetProductsOutput = await getProductsService({ tenantId: tenantId as string & UUIDString, includeMeta: true })
        // in client component, lazy import theme-shop-main, get component along with schema, let schema.parse(props) to test by zod.
        //console.log('sectionProps: ' + displayDefaultProps)
        return <ShopController
            tenant={{ tenantId, tenantName }}
            sectionProps={displayDefaultProps}
            themeName={themeOptions.themeName}
            initialView={buildShopView(result, 1, tenantName)}
            categoriesMeta={result.meta?.categories ?? []}   // 👈 新增：侧栏拼装的元数据
        />
    } catch (error) {
        console.log(error instanceof BizError ? `BizError ${error.code}: ${error.message}` : 'unknown error')
        redirect(`/not-found?httpcode=500`);
    }

}
