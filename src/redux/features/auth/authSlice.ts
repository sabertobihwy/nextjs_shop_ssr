// store/slices/authSlice.ts
import { SafeUser } from '@/types/entities/User'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
    user: SafeUser | null
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<SafeUser>) {
            state.user = action.payload
        },
        clearUser(state) {
            state.user = null
        },
    },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
