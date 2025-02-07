import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import {changeTheme} from "../../../app/appSlice";
import {selectAppStatus, selectThemeMode} from "../../../app/appSelectors";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {getTheme} from "../../theme/theme";
import {MenuButton} from "../MenuButton/MenuButton";
import LinearProgress from "@mui/material/LinearProgress";
import {selectAuth, setIsLoggedIn} from "../../../features/auth/model/authSlice";
import {ResultCode} from "../../enums/enums";
import {useLogoutMutation} from "../../../features/auth/api/authApi";
import {baseApi} from "../../../app/baseApi";

export const Header = () => {

    const dispatch = useAppDispatch()

    const themeMode = useAppSelector(selectThemeMode)

    const status = useAppSelector(selectAppStatus)

    const theme = getTheme(themeMode)

    const [logout] = useLogoutMutation()

    const changeModeHandler = () => {
        dispatch(changeTheme({
            themeMode: themeMode === 'light' ? 'dark' : 'light'
        }))
    }

    const logoutHandler = () => {
        logout().then((res) => {
            if (res.data?.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedIn({isLoggedIn: false}))
                localStorage.removeItem("sn-token")
                // dispatch(baseApi.util.resetApiState()) зачищает весь кеш
            }
        }).then( res => {
            dispatch(baseApi.util.invalidateTags(['Todolist', 'Task'])) // зачищает весь кеш определенного тега
        } )
    }

    const auth = useAppSelector(selectAuth)

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    {auth && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    )
}
