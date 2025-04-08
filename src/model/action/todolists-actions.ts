import {createAction, nanoid} from "@reduxjs/toolkit";
import {Filter} from "../../app/App.tsx";

export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolist/changeTodolistTitle')

export const changeTodolistFilterAC = createAction<{id: string, filter: Filter}>('todolist/changeTodolistFilter')