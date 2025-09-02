// redux/features/sort/sortSlice.ts
import { Shop_PageSize } from '@/constants/shop'
import { SortValue } from '@/types/entities/Sort'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ShopDisplayState {
    // 排序
    sortTag: SortValue
    // 筛选
    categories: string[]
    priceRange: PriceRange | null
    // 分页
    page: number
    pageSize: number
    totalCount: number
    totalPage: number
}

interface PriceRange {
    min: number
    max: number
}

const initialState: ShopDisplayState = {
    sortTag: SortValue.Default,
    categories: [],
    priceRange: null,
    page: 1,
    pageSize: Shop_PageSize,
    totalCount: 0,
    totalPage: 0,
}

const shopDisplay = createSlice({
    name: 'shopDisplay',
    initialState,
    reducers: {
        // 排序
        setSort: (state, action: PayloadAction<SortValue>) => {
            state.sortTag = action.payload
        },
        // 筛选
        setCategories: (state, action: PayloadAction<string[]>) => {
            state.categories = action.payload
        },
        setPriceRange: (state, action: PayloadAction<PriceRange | null>) => {
            state.priceRange = action.payload
        },
        // 分页
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload
        },
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload
        },
        setTotalPage: (state, action: PayloadAction<number>) => {
            state.totalPage = action.payload
        },
    },
})

export const {
    setSort,
    setCategories,
    setPriceRange,
    setPage,
    setPageSize,
    setTotalCount,
    setTotalPage,
} = shopDisplay.actions

export default shopDisplay.reducer
