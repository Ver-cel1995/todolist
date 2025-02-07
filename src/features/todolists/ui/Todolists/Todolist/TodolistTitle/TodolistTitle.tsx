import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import s from './TodolistTitle.module.css'
import {todolistsApi, useDeleteTodolistMutation, useUpdateTodolistMutation} from "../../../../api/_todolistsApi";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
import {RequestStatus} from "../../../../../../app/appSlice";
import {DomainTodolist} from "../../../../lib/types/types";

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({todolist}: Props) => {

    const {title, id, entityStatus} = todolist

    const dispatch = useAppDispatch();

    const [deleteTodolist] = useDeleteTodolistMutation()
    const [updateTodolist] = useUpdateTodolistMutation()

    const updateQueryData = (status: RequestStatus) => {
        dispatch(
            todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
                const todolist = state.find(tl => tl.id === id)
                if (todolist) {
                    todolist.entityStatus = status
                }
            })
        )
    }


    const removeTodolistHandler = () => {
        updateQueryData('loading')
        deleteTodolist(id)
            .unwrap() // чтобы попасть помимо then и finally, в catch
            .catch((err) => {
                updateQueryData('failed')
            })
    }
    const updateTodolistHandler = (title: string) => {
        updateTodolist({id, title})
    }

    return (
        <div className={s.container}>
            <h3><EditableSpan value={title} onChange={updateTodolistHandler}
                              entityStatus={todolist.entityStatus === 'loading'}/></h3>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
