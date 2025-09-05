'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createReduxStore } from '@/redux/store/createStore'
import { ThemeOptionsEntity } from '@/types/entities/Theme'
import { getVersion, provided, register } from '@ss/services';
import { NextLinkImplApi } from '@/lib/theme-loader/template-system/services/NextLink'
import { NextImageImplApi } from '@/lib/theme-loader/template-system/services/NextImage'

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

    useEffect(() => {
        // 1) 注册（幂等、允许 HMR 覆盖）
        register({ link: NextLinkImplApi, image: NextImageImplApi });

        // 2) 标记 & 广播
        (window as any).__SS_SERVICES_READY__ = true;
        const detail = { provided: provided(), version: getVersion(), ts: Date.now() };
        window.dispatchEvent(new CustomEvent('ss-services:ready', { detail }));

        console.log('[services] ready', detail);
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
