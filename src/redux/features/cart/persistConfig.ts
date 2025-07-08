import storage from 'redux-persist/lib/storage'
import { PersistConfig } from 'redux-persist'
import { CartState } from './cartSlice'

export const getCartPersistConfig = (tenantName: string): PersistConfig<CartState> => ({
    key: `cart-storage-${tenantName}`,
    storage,
    whitelist: ['items', 'totalCount', 'totalPrice']
})
