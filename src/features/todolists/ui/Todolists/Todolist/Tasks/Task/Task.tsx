import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import {ChangeEvent} from "react";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import {getListItemSx} from "./Task.styles";
import {TaskStatus} from "../../../../../../../common/enums/enums";
import {useDeleteTaskMutation, useUpdateTaskMutation} from "../../../../../api/tasksApi";
import {DomainTodolist} from "../../../../../lib/types/types";
import {DomainTask, UpdateTaskModel} from "../../../../../api/tasksApi.types";


type Props = {
	task: DomainTask
	todolist: DomainTodolist
}

export const Task = ({task, todolist}: Props) => {

	const [removeTask] = useDeleteTaskMutation();
	const [updateTask] = useUpdateTaskMutation();

	const removeTaskHandler = () => {
		removeTask({taskId: task.id, todolistId: todolist.id})
	}

	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

		const model: UpdateTaskModel = {
			status,
			title: task.title,
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
		}

		updateTask({ taskId: task.id, todolistId: todolist.id, model })
	}

	const changeTaskTitleHandler = (title: string) => {
		const model: UpdateTaskModel = {
			status: task.status,
			title,
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
		}

		updateTask({ taskId: task.id, todolistId: todolist.id, model })
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
