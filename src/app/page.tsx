import { ActionRespType, Product } from "@/lib/type"
import { getProducts } from "../action/action"
import PageClient from "./pageClient"
import { Status } from "@/lib/constants"

export const revalidate = 3600

export default async function Page() {
    const productState: ActionRespType<Product> = await getProducts()
    if (productState.status === Status.ERROR) {
        return <>{productState.message}</>;
    }
    return <PageClient products={productState.data} />
}