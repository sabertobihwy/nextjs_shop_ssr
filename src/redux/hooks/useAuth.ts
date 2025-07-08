// hooks/useAuth.ts
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/createStore'
import { UserPublic } from '@/types/entities/User'
import { clearUser, setUser } from '../features/auth/authSlice'


export const useAuth = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()

    return {
        user,
        setUser: (u: UserPublic) => dispatch(setUser(u)),
        clearUser: () => dispatch(clearUser()),
    }
}
