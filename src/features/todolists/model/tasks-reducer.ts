import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {DomainTask, UpdateTaskModel} from "../api/tasksApi.types";
import {Dispatch} from "redux";
import {tasksApi} from "../api/tasksApi";
import {ResultCode} from "../../../common/enums/enums";
import {RootState} from "../../../app/store";
import {setAppStatusAC} from "../../../app/app-reducer";
import {handleServerAppError} from "../../../common/utils/handleServerAppError";
import {handleServerNetworkError} from "../../../common/utils/handleServerNetworkError";


export type TasksStateType = {
    [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }

        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }

        case "ADD-TASK": {
            const newTask: DomainTask = action.payload.task
            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]}
        }

        case 'UPDATE-TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                ? {...el, ...action.payload.domainModel} : el
                )}
        }

        case "ADD-TODOLIST":
            return {...state, [action.payload.todolist.id]: []}

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return state
    }
}

// Action creators

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
    return {
        type: 'SET-TASKS',
        payload,
    } as const
}

export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {
        type: 'REMOVE-TASK',
        payload
    } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
    return {
        type: 'ADD-TASK',
        payload
    } as const
}

export const updateTaskAC = (payload: { taskId: string; todolistId: string; domainModel: UpdateTaskModel }) => {
    return {type: 'UPDATE-TASK', payload} as const
}


// THUNK

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId).then(res => {
        const tasks = res.data.items
        dispatch(setTasksAC({todolistId, tasks}))
    })
}

export const removeTaskTC =
    (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
        tasksApi.deleteTask(arg).then(res => {
            dispatch(removeTaskAC(arg))
        })
    }

export const updateTaskTC = (payload: {domainModel: UpdateTaskModel, todolistId: string, taskId: string}) => (dispatch: Dispatch, getState: () => RootState) => {
    let {domainModel ,todolistId, taskId} = payload

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === taskId)

    if (task) {
        const model: UpdateTaskModel = {
            status: task.status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel
        }
        tasksApi.updateTask({taskId, todolistId, model}).then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(updateTaskAC(payload))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}


export const addTaskTC = (payload: { title: string, todolistId: string }) => (dispatch: Dispatch) => {
    tasksApi.createTask(payload).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(addTaskAC({ task: res.data.data.item }))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType
