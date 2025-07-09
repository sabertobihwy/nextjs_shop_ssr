import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/createStore'
import { setTenantId, setTenantName } from '../features/tenant/tenantSlice'

export const useTenant = () => {
    const tenantId = useSelector((state: RootState) => state.tenant.tenantId)
    const tenantName = useSelector((state: RootState) => state.tenant.tenantName)
    const dispatch = useDispatch()

    return {
        tenantId,
        tenantName,
        setTenantId: (id: string) => dispatch(setTenantId(id)),
        setTenantName: (name: string) => dispatch(setTenantName(name)),
    }
}


