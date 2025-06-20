import { SORTLIST, Status } from "./constants";

export type SortValue = typeof SORTLIST[number]["valueName"]
export type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string,
    variant: string[]
}

export type CartProduct = {
    id: number,
    name: string,
    price: number,
    image: string,
    variant: string,
    quantity: number,
    totalPrice: number
}

export type ActionRespType<T> =
    | {
        status: Status.SUCCESS
        code: number,
        data: T[]
    }
    | {
        status: Status.ERROR
        code: number,
        message: string
    }