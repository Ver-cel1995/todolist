import {setAppStatus} from "../../../app/appSlice";
import {LoginInputs} from "../ui/login/Login";
import {AppDispatch, RootState} from "../../../app/store";
import {_authApi} from "../api/authApi";
import {ResultCode} from "../../../common/enums/enums";
import {handleServerAppError} from "../../../common/utils/handleServerAppError";
import {handleServerNetworkError} from "../../../common/utils/handleServerNetworkError";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isInitialized: false,
    },
    // reducers: {
    //     setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>)=> {
    //         state.isLoggedIn = action.payload.isLoggedIn;
    //     },
    //     setInitiallized: (state, action: PayloadAction<{isInitialized: boolean}>)=> {
    //         state.isInitialized = action.payload.isInitialized;
    //     }
    // }
    reducers: (create) => {
        return {
            setIsLoggedIn: create.reducer<{isLoggedIn: boolean}>((state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            }),
            setInitiallized: create.reducer<{isInitialized: boolean}>((state, action) => {
                state.isInitialized = action.payload.isInitialized;
            })
        }
    },
    selectors: {
        selectAuth: (state) => state.isLoggedIn,
        selectinitialized: (state) => state.isInitialized

    }
})

export const authReducer = authSlice.reducer;
export const {setIsLoggedIn, setInitiallized} = authSlice.actions
export const {selectAuth, selectinitialized} = authSlice.selectors



// thunks
export const loginTC = (data: LoginInputs) => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _authApi.login(data).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            localStorage.setItem('sn-token', res.data.data.token)
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _authApi.logout().then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setIsLoggedIn({isLoggedIn: false}))
            localStorage.getItem('sn-token')
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}

export const meTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _authApi.me().then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    }).finally(() => {
        dispatch(setInitiallized({isInitialized: true}))
    })
}
