import {instance} from "../../../common/instance/instance";
import {BaseResponse} from "../../../common/types/types";
import {LoginInputs} from "../ui/login/Login";

export const authApi = {
    login(payload: LoginInputs) {
        return instance.post<BaseResponse<{ userId: number, token: string }>>("auth/login", payload);
    },
    logout() {
        return instance.delete<BaseResponse>("auth/login")
    },
    me() {
        return instance.get<BaseResponse<{ id: number, email: string, login: string }>>("auth/me")
    }
}