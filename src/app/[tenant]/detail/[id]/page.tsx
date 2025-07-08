import { assertApiSuccess } from "@/lib/http/assert";
import PageClient from "./pageClient";
import { ProductDetailAdaptor, ProductDTO } from "@/types/entities/products";
import { TenantPublic } from "@/types/entities/Tenant";

// 产品详情页
export const revalidate = 3600;

export default async function Page({ params }: { params: Promise<{ id: string, tenant: string }> }) {
    const { id, tenant: tenantName } = await params
    const tenantRes = await fetch(`${process.env.NEXT_BASE_URL}/api/${tenantName}/tenant`, {
        next: { revalidate: 3600 }
    })
    const { tenantId } = await assertApiSuccess<TenantPublic>(tenantRes)
    // 变成fetch(`/api/${tenantName}/detail/${id}`) cache: force-store; 
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/${tenantName}/products/detail/${id}?tenantId=${tenantId}`, {
        // cache: 'no-store'
        next: { revalidate: 3600 } // ✅ 配合页面缓存，保证数据层也缓存
    });
    const detail = await assertApiSuccess<ProductDTO>(res)
    // do the convertion to VO
    // console.log('✅ ✅ ✅productDetailDTO ' + JSON.stringify(detail, null, 2))

    const adapter = new ProductDetailAdaptor(detail)
    const productDetailVO = adapter.toProductDetailVO()
    // console.log('✅ ✅ ✅productDetailVO ' + JSON.stringify(productDetailVO, null, 2))
    return (<PageClient detail={productDetailVO} />)
}