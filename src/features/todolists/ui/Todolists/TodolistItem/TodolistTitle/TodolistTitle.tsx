import {Todolist} from "../../../../../../app/App.tsx";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch.ts";
import {deleteTodolistAC, changeTodolistTitleAC} from "../../../../../../model/action/todolists-actions.ts";
import {EditableSpan} from "../../../../../../EditableSpan.tsx";
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import styles from './TodolistTitle.module.css'


type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id}))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}