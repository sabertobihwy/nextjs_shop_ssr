'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createReduxStore } from '@/redux/store/createStore'

type Props = {
    tenantName: string
    children: ReactNode
}

export default function Providers({ tenantName, children }: Props) {
    const { store, persistor } = createReduxStore(tenantName)

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
