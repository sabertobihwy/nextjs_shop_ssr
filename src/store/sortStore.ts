"use client"
import { SortValue } from '@/lib/type'
import { useStore } from 'zustand'
import { createStore, StoreApi } from 'zustand/vanilla'

type SortStoreState = {
    sortTag: SortValue
}

type SortAction = {
    setSort: (value: SortStoreState['sortTag']) => void
}

type SortStore = SortStoreState & SortAction

let _store: StoreApi<SortStore> | null = null

function initSortStore() {
    return createStore<SortStore>((set) => ({
        sortTag: 'latest',
        setSort: (tag) => set({ sortTag: tag }),
    }))
}

function getStore(): StoreApi<SortStore> {
    if (!_store) {
        _store = initSortStore()
    }
    return _store
}

function useSortStore<T>(selector: (state: SortStore) => T) {
    const store = getStore()
    return useStore(store, selector)
}

export default useSortStore