import {createReducer} from "@reduxjs/toolkit";
import {changeThemeModeAC, ThemeMode} from "../model/action/theme-actions.ts";

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(changeThemeModeAC, (state, action) => {
            state.themeMode = action.payload.value
        })
})