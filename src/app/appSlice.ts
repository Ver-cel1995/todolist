import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {todolistsApi} from "../features/todolists/api/_todolistsApi";
import {tasksApi} from "../features/todolists/api/tasksApi";

export type ThemeMode = 'dark' | 'light'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
        status: 'idle' as RequestStatus,
        error: null as string | null,
    },
    reducers: (create) => {
        return {
            changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
                state.themeMode = action.payload.themeMode
            }),
            setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
                state.status = action.payload.status
            }),
            setAppError: create.reducer<{ error: string | null }>((state, action) => {
                state.error = action.payload.error
            })
        }
    },
    extraReducers: builder => {
        builder.addMatcher(isPending,
            (state, action) => {
                if (
                    todolistsApi.endpoints.getTodolists.matchPending(action) ||
                    tasksApi.endpoints.getTasks.matchPending(action)
                ) {
                    return
                }
                state.status = 'loading'
            })
            .addMatcher(isFulfilled,
                (state, action) => {
                    state.status = 'succeeded'
                })
            .addMatcher(isRejected,
                (state, action) => {
                    state.status = 'failed'
                })
    }
})

export const appReducer = appSlice.reducer;
export const {changeTheme, setAppError, setAppStatus} = appSlice.actions;
export type AppInitialState = ReturnType<typeof appSlice.getInitialState>// тип/type
