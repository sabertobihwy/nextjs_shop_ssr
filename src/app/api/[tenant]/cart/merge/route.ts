import { upsertCartItems } from "@/db/cart.dao"
import { Status, toApiResponse } from "@/types/api/response"

export async function POST(req: Request) {
    try {
        const { user_id, tenant_id, items } = await req.json()
        console.log('==== api/[tenant]/cart/merge items=' + JSON.stringify(items))
        await upsertCartItems(user_id, tenant_id, items)
        return toApiResponse({
            status: Status.SUCCESS,
            code: 0,
            data: null
        })
    } catch (e) {
        console.error('[POST /cart/merge]', e)
        return toApiResponse({
            status: Status.ERROR,
            code: 1000,
            httpCode: 500,
            message: 'upsertCartItems failed',
        })
    }
}