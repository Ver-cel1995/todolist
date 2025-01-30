import {Todolist} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";
import {BaseResponse} from "../../../common/types/types";
import {DomainTodolist} from "../model/todolistsSlice";
import {baseApi} from "../../../app/baseApi";


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


export const _todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>(`todo-lists`)
    },
    updateTodolist(payload: { id: string, title: string }) {
        const {id, title} = payload;
        return instance.put<BaseResponse>(`todo-lists/${id}`, {title})
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: Todolist }>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponse>(`todo-lists/${id}`)
    },
}