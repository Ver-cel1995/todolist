import { Dispatch } from "redux"
import { todolistsApi } from "../api/todolistsApi"
import { Todolist } from "../api/todolistsApi.types"
import { RequestStatus, setAppError, setAppStatus } from "../../../app/appSlice"
import { ResultCode } from "common/enums"
import { handleServerNetworkError } from "common/components/utils"
import { handleServerAppError } from "common/components/utils/handleServerAppError"
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus

}


export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      // 1 variant
      // return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      // 2 variant
      action.payload.todolists.forEach(tl => {
        state.push({ ...tl, filter: "all", entityStatus: "idle" })
      })
    }),
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      const newTodolist: DomainTodolist = {
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle"
      }
      state.unshift(newTodolist)
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const todolist = state.find(tl => tl.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string, entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find(tl => tl.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),
    clearTodolist: create.reducer<undefined>((state, action) => {
      return []
    })
  }),
  selectors: {
    selectTodolists: (state) => state
  }
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  setTodolists,
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  clearTodolist
} = todolistsSlice.actions

export const { selectTodolists } = todolistsSlice.selectors



// Thunks

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi.getTodolists().then((res) => {
    dispatch(setAppStatus({ status: "succeeded" }))
    dispatch(setTodolists({ todolists: res.data }))
  }).catch(err => {
    dispatch(setAppError({ error: err.message }))
    dispatch(setAppStatus({ status: "failed" }))
  })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi.createTodolist(title).then((res) => {
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(addTodolist({ todolist: res.data.data.item }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch((err) => {
    handleServerNetworkError(err, dispatch)
  })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatus({ id: id, entityStatus: "loading" }))
  todolistsApi.deleteTodolist(id).then((res) => {
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(removeTodolist({ id: id }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch((err) => {
    handleServerNetworkError(err, dispatch)
  })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatus({ id: arg.id, entityStatus: "loading" }))
  todolistsApi.updateTodolist(arg).then((res) => {
    if (res.data.resultCode === ResultCode.success) {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(changeTodolistTitle(arg))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch(err => {
    handleServerNetworkError(err, dispatch)
  })
}
