import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import React, {useEffect} from "react";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {addTodolistAC, addTodolistTC} from "../features/todolists/model/todolists-reducer";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {selectAuth} from "../features/auth/model/authSelectors";
import {useNavigate} from "react-router";
import {Path} from "../common/routing/Routing";

export const Main = () => {

	const dispatch = useAppDispatch()

	const auth = useAppSelector(selectAuth)

	const navigate = useNavigate();

	const addTodolist = (title: string) => {
		dispatch(addTodolistTC(title))
	}

	useEffect(() => {
		if (!auth) {
			navigate(Path.Login);
		}
	}, [auth])

	return (
		<Container fixed>
			<Grid container sx={{mb: '30px'}}>
				<AddItemForm addItem={addTodolist}/>
			</Grid>

			<Grid container spacing={4}>
				<Todolists/>
			</Grid>
		</Container>
	)
}
