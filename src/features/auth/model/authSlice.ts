import { Dispatch } from "redux"
import { Inputs } from "../ui/login/Login"
import { authApi } from "../api/authApi"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/components/utils/handleServerAppError"
import { handleServerNetworkError } from "common/components/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { setAppStatus } from "../../../app/appSlice"
import { clearTodolist } from "../../todolists/model/todolistsSlice"
import { RootState } from "../../../app/store"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    })
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized
  }
})

export const authReducer = authSlice.reducer
export const {setIsLoggedIn, setIsInitialized} = authSlice.actions
export const {selectIsLoggedIn, selectIsInitialized} = authSlice.selectors


// thunks
export const loginTC = (data: Inputs) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi.login(data).then((res) => {
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      localStorage.setItem('sn-token', res.data.data.token)
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch( (err) => {
    handleServerNetworkError(err, dispatch)
  } )
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi.logout().then((res) => {
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(clearTodolist())
      localStorage.removeItem('sn-token')
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch( (err) => {
    handleServerNetworkError(err, dispatch)
  } )
}


export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .me()
    .then(res => {
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
    dispatch(setIsInitialized({isInitialized: true }))
  })
}