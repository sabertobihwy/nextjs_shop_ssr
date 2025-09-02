// store/features/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
    themeName: string
    sceneList: string[],
    themeCdnMap: Record<string, string>
}

const initialState: ThemeState = {
    themeName: '',
    sceneList: [],
    themeCdnMap: {}
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
    },
})

export default themeSlice.reducer
