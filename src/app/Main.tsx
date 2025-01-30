import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import React, {useEffect} from "react";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {useNavigate} from "react-router";
import {Path} from "../common/routing/Routing";
import {selectAuth} from "../features/auth/model/authSlice";
import {useCreateTodolistMutation} from "../features/todolists/api/_todolistsApi";

export const Main = () => {

	const auth = useAppSelector(selectAuth)

	const navigate = useNavigate();

	const [createTodolist] = useCreateTodolistMutation()

	const addTodolist = (title: string) => {
		createTodolist(title)
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
