import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "../../../NavButton.ts";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {getTheme} from "../../theme/theme.ts";
import {selectTheme} from "../../../model/selectors/theme-selectors.ts";
import {changeThemeModeAC} from "../../../model/action/theme-actions.ts";

export const Header = () => {
    const themeMode = useAppSelector(selectTheme)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({value: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
        <AppBar position="static" sx={{ mb: '30px' }}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton  background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={changeMode} />
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}