// redux/features/sort/sortSlice.ts
import { SortValue } from '@/types/entities/Sort'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SortState {
    sortTag: SortValue
}

const initialState: SortState = {
    sortTag: 'latest'
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<SortValue>) => {
            state.sortTag = action.payload
        }
    }
})

export const { setSort } = sortSlice.actions
export default sortSlice.reducer
