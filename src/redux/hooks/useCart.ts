// // redux/hooks/useCart.ts
import { useDispatch, useSelector } from 'react-redux'
import {
    addItem,
    plusQuantity,
    minusQuantity,
    removeItem,
    mergeCartLocal
} from '@/redux/features/cart/cartSlice'
import { CartProduct } from '@/types/entities/cart'
import { RootState } from '../store/createStore'

export const useCart = () => {
    const dispatch = useDispatch()

    const items: Record<string, CartProduct[]> = useSelector((state: RootState) => state.cart.items)
    const totalCount: number = useSelector((state: RootState) => state.cart.totalCount)
    const totalPrice: number = useSelector((state: RootState) => state.cart.totalPrice)

    const cartState = { items, totalCount, totalPrice }

    const cartActions = {
        addItem: (item: Omit<CartProduct, 'quantity' | 'totalPrice'>) => dispatch(addItem(item)),
        plusQuantity: (productId: string, variant: string) =>
            dispatch(plusQuantity({ productId, variant })),
        minusQuantity: (productId: string, variant: string) =>
            dispatch(minusQuantity({ productId, variant })),
        removeItem: (productId: string, variant: string) =>
            dispatch(removeItem({ productId, variant })),
        mergeCartLocal: (serverItems: CartProduct[]) =>
            dispatch(mergeCartLocal(serverItems)),
    }

    return { ...cartState, ...cartActions }
}
