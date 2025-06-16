import { SORTLIST } from "./constants";

export type SortValue = typeof SORTLIST[number]["valueName"]
export type Product = {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    variant: string[]
}