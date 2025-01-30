import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
import {DomainTodolist, removeTodolistTC, updateTodolistTitleTC} from "../../../../model/todolistsSlice";
import s from './TodolistTitle.module.css'
import {useDeleteTodolistMutation, useUpdateTodolistMutation} from "../../../../api/_todolistsApi";

type Props = {
	todolist: DomainTodolist
}

export const TodolistTitle = ({todolist}: Props) => {

	const {title, id, entityStatus} = todolist

	const [deleteTodolist] = useDeleteTodolistMutation()
	const [updateTodolist] = useUpdateTodolistMutation()

	const removeTodolistHandler = () => {
		deleteTodolist(id)
	}
	const updateTodolistHandler = (title: string) => {
		updateTodolist({id, title})
	}

	return (
		<div className={s.container}>
			<h3><EditableSpan value={title} onChange={updateTodolistHandler} entityStatus={todolist.entityStatus === 'loading'}/></h3>
			<IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
				<DeleteIcon/>
			</IconButton>
		</div>
	)
}
