import { getProductDetail } from "@/action/action"
import PageClient from "./pageClient";
import { prisma } from '@/lib/prisma'
import { ActionRespType } from "@/types/api/response";
import { ProductDetailAdaptor, ProductDTO } from "@/types/models/products";
import { Status } from "@/types/enum";

export async function generateStaticParams() {
    try {
        const products = await fetchAllProducts()
        return products.map(p => ({ id: p.id + '' }))
    } catch (err) {
        console.error('预渲染失败:', err)
        return [] // 或抛异常视需求而定
    }
}
// internal call
async function fetchAllProducts(): Promise<{
    name: string;
    id: number;
    desc: string;
}[]> {
    const result = await prisma.products.findMany()
    if (!result || result.length === 0) throw new Error('No products found')
    return result
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const productState: ActionRespType<ProductDTO> = await getProductDetail(Number(id))
    if (productState.status === Status.ERROR) {
        return <>{productState.message}</>;
    }
    const [detail] = productState.data
    // do the convertion to VO
    const adapter = new ProductDetailAdaptor(detail)
    const productDetailVO = adapter.toProductDetailVO()
    return (<PageClient detail={productDetailVO} />)
}