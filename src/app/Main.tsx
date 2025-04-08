import Grid from "@mui/material/Grid";
import {CreateItemForm} from "../CreateItemForm.tsx";
import Container from "@mui/material/Container";
import {createTodolistAC} from "../model/action/todolists-actions.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {Todolist} from "../features/todolists/ui/Todolists/Todolists.tsx";

export const Main = () => {
    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{ mb: '30px' }}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Todolist/>
        </Container>
    )
}