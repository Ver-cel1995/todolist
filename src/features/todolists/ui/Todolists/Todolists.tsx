import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "./TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "../../../../common/hooks/useAppSelector.ts";
import {selectTodolists} from "../../../../model/selectors/todolists-selectors.ts";

export const Todolist = () => {
    const todolists = useAppSelector(selectTodolists)


    return (
        <Grid container spacing={4}>
            {todolists.map(el => {
                return (
                    <Grid key={el.id}>
                        <Paper  sx={{ p: '0 20px 20px 20px' }}>
                            <TodolistItem todolist={el}/>
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    )
}