import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import React, { useEffect } from "react"
import { ErrorSnackbar, Header } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { getTheme } from "common/theme"
import { Routing } from "common/routing/Routing"
import { initializeAppTC } from "../features/auth/model/authSlice"
import { selectIsInitialized } from "../features/auth/model/authSlice"
import { CircularProgress } from "@mui/material"
import s from "./App.module.css"
import { selectThemeMode } from "./appSlice"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialize = useAppSelector(selectIsInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialize) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar/>
    </ThemeProvider>
  )
}
