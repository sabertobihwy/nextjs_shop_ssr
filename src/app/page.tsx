import { getProducts } from "./action"
import PageClient from "./pageClient"


export default async function Page() {
    const productInitialS = await getProducts()
    return <PageClient productInitialS={productInitialS} />
}