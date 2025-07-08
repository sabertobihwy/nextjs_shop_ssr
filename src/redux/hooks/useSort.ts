// redux/hooks/useSort.ts

import { setSort } from '@/redux/features/sort/sortSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/createStore'

export const useSort = () => {
    const dispatch = useDispatch()
    const sortTag = useSelector((state: RootState) => state.sort.sortTag)

    const setSortTag = (tag: typeof sortTag) => dispatch(setSort(tag))

    return { sortTag, setSortTag }
}
