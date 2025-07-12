import { CartProduct } from "@/types/entities/cart";

export function flattenCartItems(items: Record<string, CartProduct[]>): CartProduct[] {
    return Object.values(items).flat();
}