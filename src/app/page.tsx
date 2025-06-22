import { ActionRespType, Product } from "@/lib/type"
import { getProducts } from "@/action/action"
import { Status } from "@/lib/constants"
import PageClient from "./pageClient"
import Image from "next/image"

export const revalidate = 3600

export default async function Page() {
    // mock 
    // await new Promise((res) => setTimeout(res, 5000))
    const productState: ActionRespType<Product> = await getProducts()
    if (productState.status === Status.ERROR) {
        return <>{productState.message}</>;
    }
    // console.log(JSON.stringify(productState.data))
    //return <Image src={'/images/products/blender-suboer.png'} alt={'1'} sizes='180' fill priority className='object-contain self-center' />
    return <PageClient products={productState.data} />
}