import { useSelector } from 'react-redux'
import { RootState } from '../store/createStore'

function useTenantName() {
    return useSelector((state: RootState) => state.tenant.tenantName)
}

function useTenantId() {
    return useSelector((state: RootState) => state.tenant.tenantId)
}

export { useTenantName, useTenantId }