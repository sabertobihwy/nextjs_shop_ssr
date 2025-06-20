import { getProductDetail } from "@/action/action"
import { Status } from "@/lib/constants";
import { ActionRespType, Product } from "@/lib/type"
import PageClient from "./pageClient";
import { sql } from "@/lib/db";

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
async function fetchAllProducts(): Promise<Product[]> {
    const result = (await sql.query(`SELECT * FROM products`)) as unknown as Product[]
    if (!result || result.length === 0) throw new Error('No products found')
    return result
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const productState: ActionRespType<Product> = await getProductDetail(Number(id))
    if (productState.status === Status.ERROR) {
        return <>{productState.message}</>;
    }
    const detail = productState.data[0]
    // await new Promise(resolve => setTimeout(resolve, 3000))
    return (<PageClient detail={detail} />)
}