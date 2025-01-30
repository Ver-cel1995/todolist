import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";
import {addTaskTC} from "../../../model/tasksSlice";
import {DomainTodolist} from "../../../model/todolistsSlice";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {useAppSelector} from "../../../../../common/hooks/useAppSelector";
import {selectAppStatus} from "../../../../../app/appSelectors";

type Props = {
	todolist: DomainTodolist
}

export const Todolist = ({todolist}: Props) => {

	const dispatch = useAppDispatch()

	const status = useAppSelector(selectAppStatus)

	const addTaskCallback = (title: string) => {
		dispatch(addTaskTC({title, todolistId: todolist.id}))
	}

	return (
		<>
			<TodolistTitle todolist={todolist}/>
			<AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
			<Tasks todolist={todolist}/>
			<FilterTasksButtons todolist={todolist}/>
		</>
	)
}
