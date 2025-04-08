import {type ChangeEvent, type CSSProperties, useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import {CreateItemForm} from "../CreateItemForm.tsx";
import {EditableSpan} from "../EditableSpan.tsx";
import {Todolist} from "../features/todolists/api/todolistsApi.types.ts";
import {todolistsApi} from "../features/todolists/api/todolistsApi.ts";
import {tasksApi} from "../features/todolists/api/tasksApi.ts";
import {DomainTask, UpdateTaskModel} from "../features/todolists/api/tasksApi.types.ts";
import {TaskStatus} from "../common/enums/enums.ts";


export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})


  useEffect(() => {
    todolistsApi.getTodolists().then(res => {
        const todolist = res.data
        setTodolists(prevState => [...prevState, ...res.data]);

        todolist.forEach(el => {
          tasksApi.getTasks(el.id).then(res => {
            setTasks(prevState => ({...prevState, [el.id]: res.data.items}) )
          })
        })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.addTodolist({title}).then(res => {
      setTodolists([res.data.data.item, ...todolists])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.removeTodolist(id).then(res => {
      setTodolists(todolists.filter(el => el.id !== id))
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTitle({title, id}).then(res => {
      setTodolists(todolists.map(el => el.id === id ? {...el, title} : el))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.addTask({title, todolistId}).then(res => {
      const newTask = res.data.data.item
      setTasks({...tasks, [todolistId]: [...(tasks[todolistId] || []), newTask] })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.removeTask({taskId, todolistId}).then(res => {
      setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const todolistId = task.todoListId

    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    tasksApi.updateStatusTask({taskId: task.id, todolistId, model: model}).then(res => {
      setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === task.id ? {...el, ...model} : el)})
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const todolistId = task.todoListId

    const model: UpdateTaskModel = {
      description: task.description,
      title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }

    tasksApi.updateStatusTitle({taskId: task.id, todolistId, model: model}).then(res => {
      setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === task.id ? {...el, ...model} : el)})
    })
  }

  return (
      <div style={{margin: '20px'}}>
        <CreateItemForm onCreateItem={createTodolist}/>
        {todolists.map((todolist: Todolist) => (
            <div key={todolist.id} style={container}>
              <div>
                <EditableSpan value={todolist.title}
                              onChange={title => changeTodolistTitle(todolist.id, title)}/>
                <button onClick={() => deleteTodolist(todolist.id)}>x</button>
              </div>
              <CreateItemForm onCreateItem={title => createTask(todolist.id, title)}/>
              {tasks[todolist.id]?.map((task) => (
                  <div key={task.id}>
                    <Checkbox checked={task.status === 2}
                              onChange={e => changeTaskStatus(e, task)}/>
                    <EditableSpan value={task.title}
                                  onChange={title => changeTaskTitle(task, title)}/>
                    <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                  </div>
              ))}
            </div>
        ))}
      </div>
  )
}

const container: CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}
