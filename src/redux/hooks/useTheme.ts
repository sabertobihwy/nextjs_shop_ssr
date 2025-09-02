// hooks/useTheme.ts
import { useSelector } from 'react-redux'
import { RootState } from '../store/createStore'

export const useTheme = () => {
    const theme = useSelector((state: RootState) => state.theme)

    return {
        themeName: theme.themeName,
        sceneList: theme.sceneList,
        themeCdnMap: theme.themeCdnMap
    }
}
