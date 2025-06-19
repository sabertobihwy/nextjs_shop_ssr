import { getProductDetail } from "@/action/action"
import { Status } from "@/lib/constants";
import { ActionRespType, Product } from "@/lib/type"
import PageClient from "./pageClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const productState: ActionRespType<Product> = await getProductDetail(Number(id))
    if (productState.status === Status.ERROR) {
        return <>{productState.message}</>;
    }
    const detail = productState.data[0]
    await new Promise(resolve => setTimeout(resolve, 3000))
    return (<PageClient detail={detail} />)
}