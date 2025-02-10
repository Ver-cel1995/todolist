import {Todolist} from "./todolistsApi.types";
import {BaseResponse} from "../../../common/types/types";
import {baseApi} from "../../../app/baseApi";
import {DomainTodolist} from "../lib/types/types";


export const todolistsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       getTodolists: builder.query<DomainTodolist[], void>({
            query: () => 'todo-lists',
            transformResponse(res: Todolist[]): DomainTodolist[] {
                return res.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
            },
           providesTags: ['Todolist']
       }),
        createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
            query: (title) => ({
                method: 'POST',
                url: 'todo-lists',
                body: {title}
            }),
            async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
                        const index = state.findIndex(tl => tl.id === id)
                        if (index !== -1) {
                            state.splice(index, 1)
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: ['Todolist']
        }),
        deleteTodolist: builder.mutation<BaseResponse, string>({
            query: (id) => ({
                method: 'DELETE',
                url: `todo-lists/${id}`
            }),
            invalidatesTags: ['Todolist']
        }),
        updateTodolist: builder.mutation<BaseResponse, { id: string, title: string }>({
            query: ({title, id}) => ({
                method: 'PUT',
                url: `todo-lists/${id}`,
                body: {title}
            }),
            invalidatesTags: ['Todolist']
        })
    })
})

export const { useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useUpdateTodolistMutation } = todolistsApi