import { flattenCartItems } from "@/lib/utils/cart";
import { CartProduct } from "@/types/entities/cart";

export async function uploadMergedCartClient(
    userId: string,
    tenantId: string,
    tenantName: string,
    cartMap: Record<string, CartProduct[]>,
    errorCallback?: () => void
): Promise<void> {
    const cartItems = flattenCartItems(cartMap);
    if (cartItems.length === 0) return;

    const payload = cartItems.map(item => ({
        variant_id: item.variantId,
        quantity: item.quantity
    }));
    console.log(`😭==== uploadMergedCartClient: ${JSON.stringify(payload)} `)

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${tenantName}/cart/merge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userId,
                tenant_id: tenantId,
                items: payload
            })
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Upload failed: ${res.status} ${text}`);
        }
    } catch (e) {
        console.error('[uploadMergedCartClient] Failed to upload cart:', e);
        errorCallback?.();
    }
}

// key 是 `${userId}_${tenantId}`
const timers: Record<string, NodeJS.Timeout> = {}

export function debounceUploadCart(
    userId: string,
    tenantId: string,
    tenantName: string,
    cartMap: Record<string, CartProduct[]>,
    errorCallback?: () => void,
    delay = 2000
) {
    const key = `${userId}_${tenantId}`

    // 如果已有定时器，清除
    if (timers[key]) clearTimeout(timers[key])

    // 设置新定时器
    timers[key] = setTimeout(() => {
        console.log(`🌀 Debounced upload for ${key}`)
        uploadMergedCartClient(userId, tenantId, tenantName, cartMap, errorCallback)
        delete timers[key] // 清除引用
    }, delay)
}