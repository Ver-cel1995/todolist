import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import React, {useEffect} from "react";
import {changeThemeAC} from "../../../app/app-reducer";
import {selectAppStatus, selectThemeMode} from "../../../app/appSelectors";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {getTheme} from "../../theme/theme";
import {MenuButton} from "../MenuButton/MenuButton";
import LinearProgress from "@mui/material/LinearProgress";
import {logoutTC} from "../../../features/auth/model/auth-reducer";
import {selectAuth} from "../../../features/auth/model/authSelectors";

export const Header = () => {

	const dispatch = useAppDispatch()

	const themeMode = useAppSelector(selectThemeMode)

	const status = useAppSelector(selectAppStatus)

	const theme = getTheme(themeMode)

	const changeModeHandler = () => {
		dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
	}

	const auth = useAppSelector(selectAuth)

	return (
		<AppBar position="static" sx={{mb: '30px'}}>
			<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
				<IconButton color="inherit">
					<MenuIcon/>
				</IconButton>
				<div>
					{auth && <MenuButton onClick={() => dispatch(logoutTC())}>Logout</MenuButton>}
					<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
					<Switch color={'default'} onChange={changeModeHandler}/>
				</div>
			</Toolbar>
			{status === 'loading' && <LinearProgress/>}
		</AppBar>
	)
}
