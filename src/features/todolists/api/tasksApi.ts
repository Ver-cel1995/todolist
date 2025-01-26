import {BaseResponseTask, DomainTask, GetTasksResponse, UpdateTaskModel} from "./tasksApi.types";
import {instance} from "../../../common/instance/instance";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: { title: string; todolistId: string }) {
        const { todolistId, title } = payload;
        return instance.post<BaseResponseTask <{ item: DomainTask }> >(`todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(payload: { todolistId: string; taskId: string }) {
        const {todolistId, taskId} = payload
        return instance.delete<BaseResponseTask>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
        const {model, todolistId, taskId} = payload
        return instance.put<BaseResponseTask <{ item: DomainTask }> >(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}