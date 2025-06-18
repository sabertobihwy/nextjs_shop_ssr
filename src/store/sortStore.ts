"use client"
import { SortValue } from '@/lib/type'
import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

type SortStoreState = {
    sortTag: SortValue
}

type SortAction = {
    setSort: (value: SortStoreState['sortTag']) => void
}

type SortStore = SortStoreState & SortAction


const sortStore = createStore<SortStore>()((set) => ({
    sortTag: 'latest',
    setSort: (tag) => set({ sortTag: tag }),
}))


const useSortStore = <T>(selectorFn: (state: SortStoreState & SortAction) => T) => useStore(sortStore, selectorFn)

export default useSortStore