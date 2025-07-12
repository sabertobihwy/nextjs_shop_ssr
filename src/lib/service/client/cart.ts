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
