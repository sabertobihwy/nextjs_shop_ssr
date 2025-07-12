
export type CartProduct = {
    id: number,
    name: string,
    price: number,
    image: string,
    variant: string,
    quantity: number,
    totalPrice: number
    variantId: number
}
export type LoginCartProduct =
    {
        userid: string
        cartProductLst: CartProduct[]
    }