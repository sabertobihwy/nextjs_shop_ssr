import { SortValue } from '@/lib/type'
import { create } from 'zustand'

type SortStoreState = {
    sortTag: SortValue
}

type SortAction = {
    setSort: (value: SortStoreState['sortTag']) => void
}

const useSortStore = create<SortStoreState & SortAction>()((set) => ({
    sortTag: 'latest',
    setSort: (newValue) => set({ sortTag: newValue })
}))

export default useSortStore