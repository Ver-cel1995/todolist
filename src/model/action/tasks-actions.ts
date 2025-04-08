import {createAction} from "@reduxjs/toolkit";

export const deleteTaskAC = createAction<{taskId: string, todolistId: string}>('task/deleteTask')

export const createTaskAC = createAction<{title: string, todolistId: string}>('task/createTask')

export const changeTaskStatusAC = createAction<{isDone: boolean, taskId: string, todolistId: string}>('task/changeTaskStatus')

export const changeTaskTitleAC = createAction<{title: string, taskId: string, todolistId: string}>('task/changeTaskTitle')