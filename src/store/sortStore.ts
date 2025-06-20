import { SortValue } from '@/lib/type'
import { create } from 'zustand'

type SortStoreState = {
    sortTag: SortValue
}

type SortAction = {
    setSort: (value: SortStoreState['sortTag']) => void
}

type SortStore = SortStoreState & SortAction

const useSortStore = create<SortStore>()((set) => ({
    sortTag: 'latest',
    setSort: (tag) => set({ sortTag: tag }),
}))


export default useSortStore