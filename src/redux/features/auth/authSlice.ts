// store/slices/authSlice.ts
import { UserPublic } from '@/types/entities/User'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
    user: UserPublic | null
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserPublic>) {
            state.user = action.payload
        },
        clearUser(state) {
            state.user = null
        },
    },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
