import { CartProduct } from "@/lib/type";
import { create } from "zustand";

type CartStore = {
    items: Record<string, CartProduct[]>; // 用 productId 做 key，便于快速查找 & 更新
    addItem: (item: Omit<CartProduct, "quantity" | "totalPrice">) => void;
    setQuantity: (productId: string, variant: string, quantity: number) => void;
    removeItem: (productId: string, variant: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
    items: {},
    addItem: (item) =>
        set((state) => {
            const existingList = state.items[item.id] || [];

            const variantKey = item.variant ?? ""; // 防止 undefined

            const existingIndex = existingList.findIndex(
                (p) => p.variant === variantKey
            );

            let newList: CartProduct[];
            if (existingIndex !== -1) {
                // 变体已存在，更新数量
                newList = [...existingList];
                const newQuan = newList[existingIndex].quantity + 1
                newList[existingIndex] = {
                    ...newList[existingIndex],
                    quantity: newQuan,
                    totalPrice: newList[existingIndex].price * newQuan
                };
            } else {
                // 新变体，添加
                newList = [...existingList,
                {
                    ...item,
                    quantity: 1,
                    totalPrice: item.price
                }];
            }

            return {
                items: {
                    ...state.items,
                    [item.id]: newList,
                },
            };
        }),

    setQuantity: (productId, variant, quantity) =>
        set((state) => {
            const list = state.items[productId] || [];
            const updatedList = list.map((item) =>
                item.variant === variant ?
                    { ...item, quantity, totalPrice: item.price * quantity }
                    : item
            );
            return {
                items: {
                    ...state.items,
                    [productId]: updatedList,
                },
            };
        }),

    removeItem: (productId, variant) =>
        set((state) => {
            const list = state.items[productId] || [];
            const updatedList = list.filter((item) => item.variant !== variant);
            const newItems = { ...state.items };

            if (updatedList.length === 0) {
                delete newItems[productId];
            } else {
                newItems[productId] = updatedList;
            }

            return { items: newItems };
        }),
}));


export default useCartStore