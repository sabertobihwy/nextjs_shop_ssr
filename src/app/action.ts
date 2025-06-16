// app/actions.ts
'use server'

import { sql } from '@/lib/db'
import { Product, SortValue } from '@/lib/type'
import { ProductState } from './pageClient'

const sortMapping = {
    latest: {
        colName: 'id',
        orderBy: 'DESC'
    },
    high: {
        colName: 'price',
        orderBy: 'DESC'
    },
    low: {
        colName: 'price',
        orderBy: 'ASC'
    }
}
export async function getProducts(sortTag: SortValue = "latest"): Promise<ProductState> {
    const { colName, orderBy } = sortMapping[sortTag]
    const result = await sql.query(`SELECT * FROM products ORDER BY ${colName} ${orderBy}`) as unknown as Product[]
    return {
        product: result
    }
}
export async function getProductsAction(_: ProductState, formData: FormData) {
    const sortTag = formData.get('sortTag') as SortValue
    return getProducts(sortTag)
}
