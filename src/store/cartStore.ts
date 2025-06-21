import { CartProduct } from "@/lib/type";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

type CartStore = {
    items: Record<string, CartProduct[]>; // 用 productId 做 key，便于快速查找 & 更新
    totalPrice: number;
    totalCount: number;
    addItem: (item: Omit<CartProduct, "quantity" | "totalPrice">) => void;
    setQuantity: (productId: string, variant: string, quantity: number) => void;
    removeItem: (productId: string, variant: string) => void;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            totalCount: 0,
            totalPrice: 0,
            items: {},

            addItem: (item) =>
                set((state) => {
                    const existingList = state.items[item.id] || [];
                    const variantKey = item.variant ?? "";
                    const existingIndex = existingList.findIndex(
                        (p) => p.variant === variantKey
                    );

                    let newList: CartProduct[];
                    if (existingIndex !== -1) {
                        newList = [...existingList];
                        const newQuan = newList[existingIndex].quantity + 1;
                        newList[existingIndex] = {
                            ...newList[existingIndex],
                            quantity: newQuan,
                            totalPrice: newList[existingIndex].price * newQuan,
                        };
                    } else {
                        newList = [
                            ...existingList,
                            {
                                ...item,
                                quantity: 1,
                                totalPrice: item.price,
                            },
                        ];
                    }

                    return {
                        items: {
                            ...state.items,
                            [item.id]: newList,
                        },
                        totalCount: state.totalCount + 1,
                        totalPrice: state.totalPrice + item.price,
                    };
                }),

            setQuantity: (productId, variant, quantity) =>
                set((state) => {
                    const list = state.items[productId] || [];
                    const updatedList = list.map((item) =>
                        item.variant === variant
                            ? {
                                ...item,
                                quantity,
                                totalPrice: item.price * quantity,
                            }
                            : item
                    );
                    const newItems = {
                        ...state.items,
                        [productId]: updatedList,
                    };
                    const totalPrice = Object.values(newItems)
                        .flat()
                        .reduce((acc, item) => acc + item.quantity * item.price, 0);
                    const totalCount = Object.values(newItems)
                        .flat()
                        .reduce((acc, item) => acc + item.quantity, 0);

                    return {
                        items: newItems,
                        totalPrice,
                        totalCount
                    };
                }),

            removeItem: (productId, variant) =>
                set((state) => {
                    const list = state.items[productId] || [];
                    const toRemoveItem = list.find((item) => item.variant === variant);
                    const toRemoveCount = toRemoveItem!.quantity
                    const itemTotalPrice = toRemoveItem!.price * toRemoveCount;
                    const updatedList = list.filter((item) => item.variant !== variant);
                    const newItems = { ...state.items };

                    if (updatedList.length === 0) {
                        delete newItems[productId];
                    } else {
                        newItems[productId] = updatedList;
                    }

                    return {
                        items: newItems,
                        totalPrice: state.totalPrice - itemTotalPrice,
                        totalCount: state.totalCount - toRemoveCount
                    };
                }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);



export default useCartStore