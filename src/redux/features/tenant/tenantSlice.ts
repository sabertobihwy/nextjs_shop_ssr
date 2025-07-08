import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    tenantName: '',
    tenantId: ''
}

const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        setTenantName: (state, action: PayloadAction<string>) => {
            state.tenantName = action.payload
        },
        setTenantId: (state, action: PayloadAction<string>) => {
            state.tenantId = action.payload
        },
    }
})

export const { setTenantName, setTenantId } = tenantSlice.actions
export default tenantSlice.reducer
