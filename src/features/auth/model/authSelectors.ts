import {RootState} from "../../../app/store";

export const selectAuth = (state: RootState) => state.auth.isLoggedIn
export const selectinitialized = (state: RootState) => state.auth.isInitialized
