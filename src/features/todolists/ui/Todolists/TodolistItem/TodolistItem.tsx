import {Todolist} from "../../../../../app/App.tsx";
import {CreateItemForm} from "../../../../../CreateItemForm.tsx";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch.ts";
import {createTaskAC} from "../../../../../model/action/tasks-actions.ts";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "./Tasks/Tasks.tsx";
import {FilterButtons} from "./FilterButtons/FilterButtons.tsx";

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))
    }




    return (
        <>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </>
    )
}