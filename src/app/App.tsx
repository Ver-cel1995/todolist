import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from '@mui/material/styles';
import React, {useEffect, useState} from "react";
import {Header} from "../common/components/Header/Header";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {getTheme} from "../common/theme/theme";
import {selectThemeMode} from "./appSelectors";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {Routing} from "../common/routing/Routing";
import CircularProgress from "@mui/material/CircularProgress";
import s from "./App.module.css";
import {useMeQuery} from "../features/auth/api/authApi";
import {ResultCode} from "../common/enums/enums";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {setIsLoggedIn} from "../features/auth/model/authSlice";

export const App = () => {

    const themeMode = useAppSelector(selectThemeMode)

    const  dispatch = useAppDispatch();

    const [isInitialized, setIsInitialized] = useState(false)

    const {data, isLoading} = useMeQuery()

    useEffect(() => {
        if(!isLoading) {
            setIsInitialized(true)
            if (data?.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedIn({ isLoggedIn: true }))
            }
        }
    }, [isLoading, data])

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


