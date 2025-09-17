'use client'

import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createReduxStore } from '@/redux/store/createStore'
import { ThemeOptionsEntity } from '@/types/entities/Theme'

type Props = {
    tenantName: string
    children: ReactNode
    tenantId: string
    themeOptions: ThemeOptionsEntity
    themeCdnMap: Record<string, string>
}

export default function Providers({ tenantName, tenantId, themeOptions, themeCdnMap, children }: Props) {
    const storeBundleRef = useRef<ReturnType<typeof createReduxStore> | null>(null);
    if (!storeBundleRef.current) {
        storeBundleRef.current = createReduxStore(
            tenantName,
            tenantId,
            themeCdnMap,
            themeOptions
        );
    }
    const { store, persistor } = storeBundleRef.current;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
