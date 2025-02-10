import {BaseResponseTask, DomainTask, GetTasksResponse, UpdateTaskModel} from "./tasksApi.types";
import {baseApi} from "../../../app/baseApi";
import {TaskStatus} from "../../../common/enums/enums";

export const PAGE_SIZE = 4

export const tasksApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query<GetTasksResponse, { todolistId: string, args: { page: number } }>({
            query: ({todolistId, args}) => {
                const params = {...args, count: PAGE_SIZE}
                return {
                    url: `todo-lists/${todolistId}/tasks`,
                    params
                }
            },
            providesTags: (res, err, {todolistId}) => [{type: 'Task', id: todolistId}],
        }),
        createTask: builder.mutation<BaseResponseTask<{ item: DomainTask }>, { todolistId: string, title: string }>({
            query: ({todolistId, title}) => ({
                method: 'POST',
                url: `todo-lists/${todolistId}/tasks`,
                body: {title}
            }),
            invalidatesTags: (result, error, {todolistId}) => [{type: 'Task', id: todolistId}]
        }),
        deleteTask: builder.mutation<BaseResponseTask, { todolistId: string, taskId: string }>({
            query: ({taskId, todolistId}) => ({
                method: 'DELETE',
                url: `todo-lists/${todolistId}/tasks/${taskId}`
            }),
            invalidatesTags: (result, error, {todolistId}) => [{type: 'Task', id: todolistId}],
        }),
        updateTask: builder.mutation<BaseResponseTask<{ item: DomainTask }>, {
            todolistId: string,
            taskId: string,
            model: UpdateTaskModel
        }>({
            query: ({taskId, todolistId, model}) => ({
                method: 'PUT',
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                body: model
            }),
            async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
                const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')

                let patchResults: any[] = []

                cachedArgsForQuery.forEach(({ args }) => {
                    patchResults.push(
                        dispatch(
                            tasksApi.util.updateQueryData(
                                'getTasks',
                                { todolistId, args: { page: args.page } },
                                state => {
                                    const task = state.items.find(t => t.id === taskId)
                                    if (task) {
                                        task.status = model.status
                                    }
                                }
                            )
                        )
                    )
                })
                try {
                    await queryFulfilled
                } catch {
                    patchResults.forEach(patchResult => {
                        patchResult.undo()
                    })
                }
            },
            invalidatesTags: (result, error, {todolistId}) => [{type: 'Task', id: todolistId}],
        })
    })
})


export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = tasksApi