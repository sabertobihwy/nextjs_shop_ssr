import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartProduct } from '@/types/entities/cart'

export interface CartState {
    items: Record<string, CartProduct[]>
    totalCount: number
    totalPrice: number
}

const initialState: CartState = {
    items: {},
    totalCount: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Omit<CartProduct, 'quantity' | 'totalPrice'>>) => {
            const item = action.payload
            const list: CartProduct[] = state.items[item.id] || []
            const variantKey = item.variant ?? ''
            const index = list.findIndex(p => p.variant === variantKey)

            let newList: CartProduct[]
            if (index !== -1) {
                const existing = list[index]
                const newQuantity = existing.quantity + 1
                newList = [...list]
                newList[index] = {
                    ...existing,
                    quantity: newQuantity,
                    totalPrice: existing.price * newQuantity
                }
            } else {
                newList = [...list, { ...item, quantity: 1, totalPrice: item.price }]
            }

            state.items[item.id] = newList
            state.totalCount += 1
            state.totalPrice += item.price
        },

        plusQuantity: (state, action: PayloadAction<{ productId: string; variant: string }>) => {
            const { productId, variant } = action.payload
            const list: CartProduct[] = state.items[productId] || []

            const updatedList = list.map(item => {
                if (item.variant === variant) {
                    const newQuantity = item.quantity + 1
                    state.totalCount += 1
                    state.totalPrice += item.price
                    return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: item.price * newQuantity
                    }
                }
                return item
            })

            state.items[productId] = updatedList
        },

        minusQuantity: (state, action: PayloadAction<{ productId: string; variant: string }>) => {
            const { productId, variant } = action.payload
            const list: CartProduct[] = state.items[productId] || []

            const updatedList = list
                .map(item => {
                    if (item.variant === variant) {
                        if (item.quantity <= 1) return null
                        const newQuantity = item.quantity - 1
                        state.totalCount -= 1
                        state.totalPrice -= item.price
                        return {
                            ...item,
                            quantity: newQuantity,
                            totalPrice: item.price * newQuantity
                        }
                    }
                    return item
                })
                .filter((x): x is CartProduct => x !== null)

            state.items[productId] = updatedList
        },

        removeItem: (state, action: PayloadAction<{ productId: string; variant: string }>) => {
            const { productId, variant } = action.payload
            const list: CartProduct[] = state.items[productId] || []
            const target = list.find(item => item.variant === variant)
            if (!target) return

            const newList = list.filter(item => item.variant !== variant)

            if (newList.length === 0) {
                delete state.items[productId]
            } else {
                state.items[productId] = newList
            }

            state.totalCount -= target.quantity
            state.totalPrice -= target.quantity * target.price
        }
    }
})

export const {
    addItem,
    plusQuantity,
    minusQuantity,
    removeItem
} = cartSlice.actions

export default cartSlice.reducer
