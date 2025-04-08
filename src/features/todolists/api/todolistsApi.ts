import {instance} from "../../../common/instance/instance.ts";
import {Todolist} from "./todolistsApi.types.ts";
import {BaseResponse} from "../../../common/types/types.ts";

export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>('/todo-lists')
    },
    addTodolist(payload:{title: string}) {
        return instance.post<BaseResponse<{item: Todolist}>>('/todo-lists', payload)
    },
    removeTodolist(id: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${id}`)
    },
    changeTitle(payload: {title: string, id: string}) {
        const {id, title} = payload
        return instance.put<BaseResponse>(`/todo-lists/${id}`, {title})
    }
}