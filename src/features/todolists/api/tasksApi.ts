import {instance} from "../../../common/instance/instance.ts";
import {DomainTask, GetTasksResponse, UpdateTaskModel} from "./tasksApi.types.ts";
import {BaseResponse} from "../../../common/types/types.ts";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    addTask(payload: {todolistId: string, title: string}) {
        const {title, todolistId} = payload
        return instance.post<BaseResponse<{item: DomainTask}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateStatusTask(payload: {taskId: string, todolistId: string, model: UpdateTaskModel}) {
        const {taskId, model, todolistId} = payload
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    removeTask(payload: {taskId: string, todolistId: string}) {
        const {taskId, todolistId} = payload
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateStatusTitle(payload: {taskId: string, todolistId: string, model: UpdateTaskModel}) {
        const {taskId, model, todolistId} = payload
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}