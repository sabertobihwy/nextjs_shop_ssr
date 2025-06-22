// app/actions.ts
'use server'
import { prisma } from '@/lib/prisma'
//import { sql } from '@/lib/db'
import { ActionRespType, Product } from '@/lib/type'
import { Status } from '@/lib/constants'
import { adaptorTmp, ProductDTO } from '@/domain/products'


export async function getProducts(): Promise<ActionRespType<Product>> {
    try {
        //const result = (await sql.query(`SELECT * FROM products`)) as unknown as Product[]
        const productsWithVariants: ProductDTO[] = await prisma.products.findMany({
            include: {
                variants: true
            }
        })
        const result = adaptorTmp(productsWithVariants)
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

export async function getProductDetail(id: number): Promise<ActionRespType<Product>> {
    try {
        // const result = (await sql.query(`SELECT * FROM products WHERE id = $1`, [id])) as unknown as Product[]
        const product = await prisma.products.findUnique({
            where: { id },
            include: { variants: true }
        })
        const result: Product = adaptorTmp(product!)
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
