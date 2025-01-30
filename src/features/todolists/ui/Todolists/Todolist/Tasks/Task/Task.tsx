import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import {ChangeEvent} from "react";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch";
import {removeTaskTC, updateTaskTC} from "../../../../../model/tasksSlice";
import {DomainTodolist} from "../../../../../model/todolistsSlice";
import {getListItemSx} from "./Task.styles";
import {DomainTask} from "../../../../../api/tasksApi.types";
import {TaskStatus} from "../../../../../../../common/enums/enums";


type Props = {
	task: DomainTask
	todolist: DomainTodolist
}

export const Task = ({task, todolist}: Props) => {

	const dispatch = useAppDispatch()

	const removeTaskHandler = () => {
		dispatch(removeTaskTC({taskId: task.id, todolistId: todolist.id}))
	}

	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
		dispatch(updateTaskTC({domainModel: {status}, taskId: task.id, todolistId: task.todoListId}))
	}

	const changeTaskTitleHandler = (title: string) => {
		dispatch(updateTaskTC({domainModel: {title}, taskId: task.id, todolistId: task.todoListId}))
	}

	return (
		<ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
			<div>
				<Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} disabled={todolist.entityStatus === 'loading'}/>
				<EditableSpan value={task.title} onChange={changeTaskTitleHandler} entityStatus={todolist.entityStatus === 'loading'}/>
			</div>
			<IconButton onClick={removeTaskHandler} disabled={todolist.entityStatus === 'loading'}>
				<DeleteIcon/>
			</IconButton>
		</ListItem>
	)
}
