import {DomainTask, UpdateTaskModel} from "../api/tasksApi.types";
import {Dispatch} from "redux";
import {tasksApi} from "../api/tasksApi";
import {ResultCode} from "../../../common/enums/enums";
import {RootState} from "../../../app/store";
import {setAppStatus} from "../../../app/appSlice";
import {handleServerAppError} from "../../../common/utils/handleServerAppError";
import {handleServerNetworkError} from "../../../common/utils/handleServerNetworkError";
import {createSlice} from "@reduxjs/toolkit";
import {addTodolist, removeTodolist} from "./todolistsSlice";


export type TasksStateType = {
    [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: (create) => ({
        setTasks: create.reducer<{todolistId: string; tasks: DomainTask[]}>((state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        }),
        removeTask: create.reducer<{taskId: string, todolistId: string}>((state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        }),
        addTask: create.reducer<{task: DomainTask}>((state, action) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        }),
        updateTask: create.reducer<{taskId: string; todolistId: string; domainModel: UpdateTaskModel}>((state, action) => {
            const tasks = state[action.payload.todolistId]
            let index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        }),
        clearTasks: create.reducer((state, action) => {
            return {}
        })
    }),
    extraReducers: (builder) => {
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolist, (state, action) => {
            delete state[action.payload.id]
        })
    },
    selectors: {
        selectTasks: (state) => state
    }
})

export const {setTasks, removeTask, updateTask, addTask, clearTasks} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors


// THUNK

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId).then(res => {
        const tasks = res.data.items
        dispatch(setTasks({todolistId, tasks}))
    })
}

export const removeTaskTC =
    (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
        tasksApi.deleteTask(arg).then(res => {
            dispatch(removeTask(arg))
        })
    }

export const updateTaskTC = (payload: {
    domainModel: UpdateTaskModel,
    todolistId: string,
    taskId: string
}) => (dispatch: Dispatch, getState: () => RootState) => {
    let {domainModel, todolistId, taskId} = payload

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
                dispatch(updateTask(payload))
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
            dispatch(addTask({task: res.data.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}

