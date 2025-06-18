import { ActionRespType, Product } from "@/lib/type"
import { getProducts } from "@/action/action"
import { Status } from "@/lib/constants"
import PageClient from "./pageClient"

export const revalidate = 3600

export default async function Page() {
    // mock 
    // await new Promise((res) => setTimeout(res, 5000))
    const productState: ActionRespType<Product> = await getProducts()
    if (productState.status === Status.ERROR) {
        return <>{productState.message}</>;
    }
    return <PageClient products={productState.data} />
}