import {setAppStatus} from "../../../app/appSlice";
import {LoginInputs} from "../ui/login/Login";
import {AppDispatch, RootState} from "../../../app/store";
import {_authApi} from "../api/authApi";
import {ResultCode} from "../../../common/enums/enums";
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




