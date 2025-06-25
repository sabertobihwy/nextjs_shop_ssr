import { CartProduct } from "@/types/models/cart";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

type CartStore = {
    items: Record<string, CartProduct[]>; // 用 productId 做 key，便于快速查找 & 更新
    totalPrice: number;
    totalCount: number;
    addItem: (item: Omit<CartProduct, "quantity" | "totalPrice">) => void;
    plusQuantity: (productId: string, variant: string) => void;
    minusQuantity: (productId: string, variant: string) => void;
    //setQuantity: (productId: string, variant: string, quantity: number) => void;
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

            plusQuantity: (productId, variant) => {
                set((state) => {
                    const list = state.items[productId] || [];
                    let perPrice = 0;
                    const updatedList = list.map((item) => {
                        if (item.variant === variant) {
                            const newQuantity = item.quantity + 1;
                            perPrice = item.price;
                            return {
                                ...item,
                                quantity: newQuantity,
                                totalPrice: item.price * newQuantity,
                            };
                        }
                        return item;
                    });
                    return {
                        items: {
                            ...state.items,
                            [productId]: updatedList,
                        },
                        totalPrice: state.totalPrice + perPrice,
                        totalCount: state.totalCount + 1,
                    };
                })
            },

            minusQuantity: (productId, variant) => {
                set((state) => {
                    const list = state.items[productId] || [];

                    let perPrice = 0;

                    const updatedList = list
                        .map((item) => {
                            if (item.variant === variant) {
                                if (item.quantity <= 1) {
                                    // 边界情况，返回 null 表示要删掉
                                    perPrice = item.price;
                                    return null;
                                }

                                const newQuantity = item.quantity - 1;
                                perPrice = item.price;

                                return {
                                    ...item,
                                    quantity: newQuantity,
                                    totalPrice: item.price * newQuantity,
                                };
                            }

                            return item;
                        })
                        .filter((item): item is CartProduct => item !== null);

                    return {
                        items: {
                            ...state.items,
                            [productId]: updatedList,
                        },
                        totalPrice: Math.max(0, state.totalPrice - perPrice),
                        totalCount: Math.max(0, state.totalCount - 1),
                    };
                });
            },

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