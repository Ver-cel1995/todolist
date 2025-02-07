import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import {Todolist} from "./Todolist/Todolist";
import {useGetTodolistsQuery} from "../../api/_todolistsApi";
import {TodolistSkeleton} from "../skeletons/TodolistSkeleton/TodolistSkeleton";

export const Todolists = () => {

    const {data, isLoading} = useGetTodolistsQuery()

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px' }}>
                {Array(3)
                    .fill(null)
                    .map((_, id) => (
                        <TodolistSkeleton key={id} />
                    ))}
            </div>
        )
    }

    return (
        <>
            {data?.map((tl) => {
                return (
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist key={tl.id} todolist={tl}/>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}
