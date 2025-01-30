import {v1} from "uuid";
import {Todolist} from "../api/todolistsApi.types";
import {_todolistsApi} from "../api/_todolistsApi";
import {RootState} from "../../../app/store";
import {Dispatch} from "redux";
import {appSlice, RequestStatus, setAppStatus} from "../../../app/appSlice";
import {handleServerNetworkError} from "../../../common/utils/handleServerNetworkError";
import {createSlice} from "@reduxjs/toolkit";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
    entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: (create) => {
        return {
            removeTodolist: create.reducer<{id: string}>((state, action) => {
                const index = state.findIndex(el => el.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }),
            addTodolist: create.reducer<{todolist: Todolist}>((state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
            }),
            changeTodolistTitle: create.reducer<{id: string, title: string}>((state, action) => {
                const index = state.findIndex(el => el.id === action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            }),
            changeTodolistFilter: create.reducer<{id: string, filter: FilterValuesType}>((state, action) => {
                const index = state.findIndex(el => el.id === action.payload.id)
                if (index !== -1) {
                    state[index].filter = action.payload.filter
                }
            }),
            changeTodolistEntityStatus: create.reducer<{id: string, entityStatus: RequestStatus}>((state, action) => {
                const todolist = state.find(el => el.id === action.payload.id)
                if (todolist) {
                    todolist.entityStatus = action.payload.entityStatus
                }
            }),
            setTodolists: create.reducer<{todolists: Todolist[]}>((state, action) => {
                // такой вариант не запрещён
                // return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: "idle"}))

                action.payload.todolists.forEach(todo => {
                    state.push({...todo, filter: 'all', entityStatus: "idle"})
                })
            }),
            clearTodolists: create.reducer((state, action) => {
                state.length = 0
            })
        }
    },
    selectors: {
        selectTodolists: (state) => state
    }
})

export const todolistsReducer = todolistsSlice.reducer;
export const {removeTodolist, addTodolist, changeTodolistTitle, changeTodolistEntityStatus, changeTodolistFilter, setTodolists, clearTodolists} = todolistsSlice.actions;
export const {selectTodolists} = todolistsSlice.selectors

//THUNK

export const fetchTodolistsThunk = (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAppStatus({status: 'loading'}))
    _todolistsApi.getTodolists().then(res => {
        dispatch(setAppStatus({status: 'succeeded'}))
        dispatch(setTodolists({todolists: res.data}))
    }).catch(error => {
        handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    _todolistsApi.createTodolist(title).then(res => {
        dispatch(setAppStatus({status: 'succeeded'}))
        dispatch(addTodolist({todolist: res.data.data.item}))
    })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({ id, entityStatus: 'loading' }))
    _todolistsApi.deleteTodolist(id).then(res => {
        dispatch(setAppStatus({status: 'succeeded'}))
        dispatch(removeTodolist({id}))
    })
}

export const updateTodolistTitleTC =
    (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        _todolistsApi.updateTodolist(arg).then(res => {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(changeTodolistTitle(arg))
        })
    }
