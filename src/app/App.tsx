import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from '@mui/material/styles';
import React, {useEffect} from "react";
import {Header} from "../common/components/Header/Header";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {getTheme} from "../common/theme/theme";
import {selectThemeMode} from "./appSelectors";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {Routing} from "../common/routing/Routing";
import {meTC} from "../features/auth/model/auth-reducer";
import {selectinitialized} from "../features/auth/model/authSelectors";
import CircularProgress from "@mui/material/CircularProgress";
import s from "./App.module.css";

export const App = () => {

    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch();

    const isInitialized = useAppSelector(selectinitialized)

    useEffect(() => {
        dispatch(meTC())
    }, []);

    if (!isInitialized) {
        return (
            <div className={s.circularProgressContainer}>
                <CircularProgress size={150} thickness={3}/>
            </div>
        )
    }

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Routing/>
            <ErrorSnackbar/>
        </ThemeProvider>
    );
}


