// app/actions.ts
'use server'
import { prisma } from '@/lib/prisma'
//import { sql } from '@/lib/db'
import { ActionRespType } from '@/lib/type'
import { Status } from '@/lib/constants'
import { ProductDTO } from '@/domain/products'


export async function getProducts(): Promise<ActionRespType<ProductDTO>> {
    try {
        //const result = (await sql.query(`SELECT * FROM products`)) as unknown as Product[]
        const result: ProductDTO[] = await prisma.products.findMany({
            include: {
                variants: true
            }
        })
        // const result = adaptorTmp(productsWithVariants)
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

export async function getProductDetail(id: number): Promise<ActionRespType<ProductDTO>> {
    try {
        // const result = (await sql.query(`SELECT * FROM products WHERE id = $1`, [id])) as unknown as Product[]
        const result = await prisma.products.findUnique({
            where: { id },
            include: { variants: true }
        })
        // const result: Product = adaptorTmp(product!)
        if (!result) return {
            status: Status.ERROR,
            code: 404,
            message: "没有查到商品"
        }
        return {
            status: Status.SUCCESS,
            code: 200,
            data: [result]
        }
    } catch (error) {
        console.error("获取产品出错", error)
        return {
            status: Status.ERROR,
            code: 500,
            message: "查询商品detail时出错"
        }
    }
}
