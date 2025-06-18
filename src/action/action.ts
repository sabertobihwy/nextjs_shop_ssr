// app/actions.ts
'use server'

import { sql } from '@/lib/db'
import { ActionRespType, Product } from '@/lib/type'
import { Status } from '@/lib/constants'

export async function getProducts(): Promise<ActionRespType<Product>> {
    try {
        const result = (await sql.query(`SELECT * FROM products`)) as unknown as Product[]
        return {
            status: Status.SUCCESS,
            code: 200,
            data: result
        }
    } catch (error) {
        console.error("获取产品出错", error)
        return {
            status: Status.ERROR,
            code: 500,
            message: "查询商品时出错"
        }
    }
}
