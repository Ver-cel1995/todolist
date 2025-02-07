import {BaseResponseTask, DomainTask, GetTasksResponse, UpdateTaskModel} from "./tasksApi.types";
import {baseApi} from "../../../app/baseApi";


export const tasksApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query<GetTasksResponse, {todolistId: string}>({
            query: ({todolistId}) => `todo-lists/${todolistId}/tasks`,
            providesTags: (res, err, { todolistId }) => [{ type: 'Task', id: todolistId }],
        }),
        createTask: builder.mutation<BaseResponseTask <{ item: DomainTask }>, {todolistId: string, title: string}>({
            query: ({todolistId, title}) => ({
                method: 'POST',
                url: `todo-lists/${todolistId}/tasks`,
                body: {title}
            }),
            invalidatesTags: (result, error, { todolistId }) => [{ type: 'Task', id: todolistId }]
        }),
        deleteTask: builder.mutation<BaseResponseTask, {todolistId: string, taskId: string}>({
            query: ({taskId, todolistId}) => ({
                method: 'DELETE',
                url: `todo-lists/${todolistId}/tasks/${taskId}`
            }),
            invalidatesTags: (result, error, { todolistId }) => [{ type: 'Task', id: todolistId }],
        }),
        updateTask: builder.mutation<BaseResponseTask <{ item: DomainTask }>,{todolistId: string, taskId: string, model: UpdateTaskModel}>({
            query: ({taskId, todolistId, model}) => ({
                method: 'PUT',
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                body: model
            }),
            invalidatesTags: (result, error, { todolistId }) => [{ type: 'Task', id: todolistId }],
        })
    })
})


export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = tasksApi