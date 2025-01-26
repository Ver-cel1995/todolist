import List from "@mui/material/List";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {selectTasks} from "../../../../model/tasksSelectors";
import {DomainTodolist} from "../../../../model/todolists-reducer";
import {Task} from "./Task/Task";
import {TaskStatus} from "../../../../../../common/enums/enums";
import {useEffect} from "react";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
import {fetchTasksTC} from "../../../../model/tasks-reducer";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {

    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, []);

    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => task.status === TaskStatus.New)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.status === TaskStatus.Completed)
    }

    return (
        <>
            {
                tasksForTodolist?.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasksForTodolist?.map((task) => {
                            return <Task task={task} todolist={todolist}/>
                            })}
                    </List>
            }
        </>
    )
}
