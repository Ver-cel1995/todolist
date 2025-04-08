import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import type {ChangeEvent} from 'react'
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch.ts";
import {Task} from "../../../../../../../app/App.tsx";
import {deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC} from "../../../../../../../model/action/tasks-actions.ts";
import {getListItemSx} from './TaskItem.styles'
import {EditableSpan} from "../../../../../../../EditableSpan.tsx";

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: newStatusValue}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle} />
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}