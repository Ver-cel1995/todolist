import './App.css'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {useAppSelector} from '../common/hooks/useAppSelector'
import {selectTheme} from "../model/selectors/theme-selectors.ts";
import {getTheme} from "../common/theme/theme.ts";
import {Header} from "../common/components/Header/Header.tsx";
import {Main} from "./Main.tsx";


export type Filter =  'all' | 'completed' | 'active'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Tasks = {
  [key: string]: Task[]
}

export type Todolist = {
  id: string
  title: string
  filter: Filter

}

export const App = () => {

  const themeMode = useAppSelector(selectTheme)

  const theme = getTheme(themeMode)

  return (
      <div className="app">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header/>
          <Main/>
        </ThemeProvider>
      </div>
  )
}
