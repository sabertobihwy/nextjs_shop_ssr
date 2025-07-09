import PageClient from "./pageClient"
import { ProductAdapter, ProductDisplayVO, ProductDTO } from "@/types/entities/products"
import { assertApiSuccess } from "@/lib/http/assert"
import { TenantPublic } from "@/types/entities/Tenant"

export const revalidate = 3600 // page cache 

export default async function Page({ params }: { params: Promise<{ tenant: string }> }) {

    // SSR get tenantId 
    // get, 可以改造成server fetch，能够revalidate
    const { tenant: tenantName } = await params
    // const tenanetResp: TenantPublic | null = await getTenantIdByName(tenantName)
    //  console.log(process.env.NEXT_BASE_URL)
    const tenantRes = await fetch(`${process.env.NEXT_BASE_URL}/api/${tenantName}/tenant`, {
        next: { revalidate: 3600 }
    })
    const { tenantId } = await assertApiSuccess<TenantPublic>(tenantRes)
    // get - server fetch - route handler 

    const productRes = await fetch(`${process.env.NEXT_BASE_URL}/api/${tenantName}/products?tenantId=${tenantId}`,
        {
            next: { revalidate: 3600 }
        })
    const productDTOlst = await assertApiSuccess<ProductDTO[]>(productRes)
    // 现在result =  ActionRespTypeSuccess<T>
    const adapter = new ProductAdapter(productDTOlst)
    const productDisplayList: ProductDisplayVO[] = adapter.toProductDisplayVO()
    return <PageClient products={productDisplayList} tenantId={tenantId} />
}
