'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createReduxStore } from '@/redux/store/createStore'
import { SafeUser } from '@/types/entities/User'
import { SilentTokenRefresher } from './auth/SilentTokenRefresher'
import TenantBootstrap from './tenant/TenantBootstrap'

type Props = {
    tenantName: string
    userSafe: SafeUser | null
    children: ReactNode
}

export default function Providers({ tenantName, userSafe, children }: Props) {
    const { store, persistor } = createReduxStore(tenantName, userSafe)

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TenantBootstrap tenantName={tenantName}>
                    <SilentTokenRefresher tenantName={tenantName} />
                    {children}
                </TenantBootstrap>
            </PersistGate>
        </Provider>
    )
}
