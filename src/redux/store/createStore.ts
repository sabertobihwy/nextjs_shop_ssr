import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import tenantReducer from '@/redux/features/tenant/tenantSlice'
import authReducer from '@/redux/features/auth/authSlice'
import cartReducer from '@/redux/features/cart/cartSlice'
import themeReducer from '@/redux/features/theme/themeSlice'
import shopDisplayReducer from '@/redux/features/shop/shopDisplaySlice'
import { getCartPersistConfig } from '../features/cart/persistConfig'
import { createCartUploaderMiddleware } from '../middleware/cartUploader'
import { ThemeOptionsEntity } from '@/types/entities/Theme'

export function createReduxStore(tenantName: string, tenantId: string, themeCdnMap: Record<string, string>, themeOptions: ThemeOptionsEntity) {
    const rootReducer = combineReducers({
        tenant: tenantReducer,
        auth: authReducer,
        shopDisplay: shopDisplayReducer,
        cart: persistReducer(getCartPersistConfig(tenantName), cartReducer),
        theme: themeReducer,
    })

    // ✅ 使用 preloadedState 传入初始 tenantName
    const preloadedState = {
        tenant: {
            tenantName,
            tenantId
        },
        theme: {
            themeName: themeOptions.themeName,
            sceneList: Object.keys(themeOptions.pageInstanceMap),
            themeCdnMap
        }

    }

    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({ serializableCheck: false }).concat(createCartUploaderMiddleware()),
    })

    const persistor = persistStore(store)

    return { store, persistor }
}

export type RootState = ReturnType<ReturnType<typeof createReduxStore>['store']['getState']>
export type AppDispatch = ReturnType<ReturnType<typeof createReduxStore>['store']['dispatch']>


