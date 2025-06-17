// app/actions.ts
'use server'

import { sql } from '@/lib/db'
import { ActionRespType, Product, SortValue } from '@/lib/type'
import { Status } from '@/lib/constants'

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
export async function getProducts(sortTag: SortValue = "latest"): Promise<ActionRespType<Product>> {
    try {
        const { colName, orderBy } = sortMapping[sortTag]
        const result = (await sql.query(`SELECT * FROM products ORDER BY ${colName} ${orderBy}`)) as unknown as Product[]
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
