import List from "@mui/material/List";
import {Task} from "./Task/Task";
import {TaskStatus} from "../../../../../../common/enums/enums";
import {PAGE_SIZE, useGetTasksQuery} from "../../../../api/tasksApi";
import {TasksSkeleton} from "../../../skeletons/TasksSkeleton/TasksSkeleton";
import {DomainTodolist} from "../../../../lib/types/types";
import {TasksPagination} from "../TasksPagination/TasksPagination";
import {useState} from "react";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {

    const [page, setPage] = useState(1)

    const {data, isLoading, isFetching} = useGetTasksQuery({todolistId: todolist.id, args: {page}})


    if (isLoading) { // isLoading на первую загрузку(запрос), isFetching на каждый запрос
        return <TasksSkeleton/>
    }

    let tasksForTodolist = data?.items

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist?.filter(task => task.status === TaskStatus.New)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist?.filter(task => task.status === TaskStatus.Completed)
    }

    return (
        <>
            {
                tasksForTodolist?.length === 0
                    ? <p>Тасок нет</p>
                    : <>
                        <List key={todolist.id}>
                            {tasksForTodolist?.map((task) => {
                                return <Task task={task} todolist={todolist} key={task.id}/>
                            })}
                        </List>
                        <TasksPagination setPage={setPage} page={page} totalCount={data?.totalCount || 0}/>
                    </>

            }
        </>
    )
}
