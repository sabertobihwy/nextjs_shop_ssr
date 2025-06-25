import { ActionRespType } from "@/types/api/response"
import { getProducts } from "@/action/action"
import PageClient from "./pageClient"
import { ProductAdapter, ProductDisplayVO, ProductDTO } from "@/types/models/products"
import { Status } from "@/types/enum"

export const revalidate = 3600

export default async function Page() {
    // mock 
    // await new Promise((res) => setTimeout(res, 5000))
    const result: ActionRespType<ProductDTO> = await getProducts()
    if (result.status === Status.ERROR) {
        return <>{result.message}</>;
    }
    const adapter = new ProductAdapter(result.data)
    const productDisplayList: ProductDisplayVO[] = adapter.toProductDisplayVO()
    return <PageClient products={productDisplayList} />
}