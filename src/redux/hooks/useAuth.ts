// hooks/useAuth.ts
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/createStore'
import { clearUser, setUser } from '../features/auth/authSlice'
import { SafeUser } from '@/types/entities/User'


export const useAuth = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()

    return {
        user,
        setUser: (u: SafeUser) => dispatch(setUser(u)),
        clearUser: () => dispatch(clearUser()),
    }
}
