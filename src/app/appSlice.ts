import { createSlice } from "@reduxjs/toolkit"

export type ThemeMode = "dark" | "light"
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'



export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as string | null,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{themeMode: ThemeMode}>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{status: RequestStatus}>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{error: string | null}>((state, action) => {
      state.error = action.payload.error
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  }
})

export const appReducer = appSlice.reducer
export const {selectThemeMode, selectStatus, selectError} = appSlice.selectors
export const {changeTheme, setAppStatus, setAppError } = appSlice.actions

// Если вдруг нужен тип
export type AppState = ReturnType<typeof appSlice.getInitialState>

