import { Dispatch } from "redux"
import { RootState } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "common/enums"
import { handleServerNetworkError } from "common/components/utils"
import { handleServerAppError } from "common/components/utils/handleServerAppError"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolistsSlice"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: create => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel}>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.domainModel }
      }
    }),
    clearTasks: create.reducer<undefined>(() => {
      return {}
    })
  }),
  extraReducers: (builder) => {
    builder.addCase(addTodolist, (state, action) => {
      // return { ...state, [action.payload.todolist.id]: [] }
      state[action.payload.todolist.id] = []
    })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state.tasks
  }
})

export const { setTasks, removeTask, addTask, updateTask } = tasksSlice.actions
export const {selectTasks} = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer


// Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi.getTasks(todolistId).then((res) => {
    dispatch(setAppStatus({ status: "succeeded" }))
    const tasks = res.data.items
    dispatch(setTasks({ todolistId, tasks }))
  })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi.deleteTask(arg).then((res) => {
    dispatch(setAppStatus({ status: "succeeded" }))
    dispatch(removeTask(arg))
  })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi.createTask(arg).then((res) => {
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(addTask({ task: res.data.data.item }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch((err) => {
    handleServerNetworkError(err, dispatch)
  })
}

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
    (dispatch: Dispatch, getState: () => RootState) => {
      const { taskId, todolistId, domainModel } = arg

      const allTasksFromState = getState().tasks
      const tasksForCurrentTodolist = allTasksFromState[todolistId]
      const task = tasksForCurrentTodolist.find((t: DomainTask) => t.id === taskId)

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
        dispatch(setAppStatus({ status: "loading" }))
        tasksApi.updateTask({ taskId, todolistId, model }).then((res) => {
          if (res.data.resultCode === ResultCode.success) {
            dispatch(setAppStatus({ status: "succeeded" }))
            dispatch(updateTask(arg))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        }).catch(err => {
          handleServerNetworkError(err, dispatch)
        })
      }
    }

