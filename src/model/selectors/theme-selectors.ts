import {RootState} from "../../app/store.ts";
import {ThemeMode} from "../action/theme-actions.ts";

export const selectTheme = (state: RootState): ThemeMode => state.appReducer.themeMode