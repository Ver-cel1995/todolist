import {createAction} from "@reduxjs/toolkit";

export const changeThemeModeAC = createAction<{value: ThemeMode}>('theme/changeThemeMode')

export type ThemeMode = 'dark' | 'light'