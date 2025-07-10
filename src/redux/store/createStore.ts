import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import tenantReducer from '@/redux/features/tenant/tenantSlice'
import authReducer from '@/redux/features/auth/authSlice'
import cartReducer from '@/redux/features/cart/cartSlice'
import sortReducer from '@/redux/features/sort/sortSlice'
import { getCartPersistConfig } from '../features/cart/persistConfig'
import { UserPublic } from '@/types/entities/User'

export function createReduxStore(tenantName: string, userInfo: UserPublic | null) {
    const rootReducer = combineReducers({
        tenant: tenantReducer,
        auth: authReducer,
        sort: sortReducer,
        cart: persistReducer(getCartPersistConfig(tenantName), cartReducer)
    })

    // ✅ 使用 preloadedState 传入初始 tenantName
    const preloadedState = {
        tenant: {
            tenantName,
            tenantId: ''
        },
        auth: {
            user: userInfo
        }
    }

    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false })
    })

    const persistor = persistStore(store)

    return { store, persistor }
}

export type RootState = ReturnType<ReturnType<typeof createReduxStore>['store']['getState']>
export type AppDispatch = ReturnType<ReturnType<typeof createReduxStore>['store']['dispatch']>


