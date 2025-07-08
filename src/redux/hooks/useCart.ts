// redux/hooks/useCart.ts
import { useDispatch, useSelector } from 'react-redux'
import {
    addItem,
    plusQuantity,
    minusQuantity,
    removeItem
} from '@/redux/features/cart/cartSlice'
import { CartProduct } from '@/types/entities/cart'
import { RootState } from '../store/createStore'

export const useCart = () => {
    const dispatch = useDispatch()

    const items = useSelector((state: RootState) => state.cart.items)
    const totalCount = useSelector((state: RootState) => state.cart.totalCount)
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice)

    return {
        items,
        totalCount,
        totalPrice,
        addItem: (item: Omit<CartProduct, 'quantity' | 'totalPrice'>) => dispatch(addItem(item)),
        plusQuantity: (productId: string, variant: string) =>
            dispatch(plusQuantity({ productId, variant })),
        minusQuantity: (productId: string, variant: string) =>
            dispatch(minusQuantity({ productId, variant })),
        removeItem: (productId: string, variant: string) =>
            dispatch(removeItem({ productId, variant }))
    }
}
