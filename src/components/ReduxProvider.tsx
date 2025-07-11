'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createReduxStore } from '@/redux/store/createStore'
import { UserPublic } from '@/types/entities/User'
import { SilentTokenRefresher } from './auth/SilentTokenRefresher'

type Props = {
    tenantName: string
    userpublic: UserPublic | null
    children: ReactNode
}

export default function Providers({ tenantName, userpublic, children }: Props) {
    const { store, persistor } = createReduxStore(tenantName, userpublic)

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SilentTokenRefresher tenantName={tenantName} />
                {children}
            </PersistGate>
        </Provider>
    )
}
