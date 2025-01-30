import {instance} from "../../../common/instance/instance";
import {BaseResponse} from "../../../common/types/types";
import {LoginInputs} from "../ui/login/Login";
import {baseApi} from "../../../app/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: build => ({
        me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
            query: () => 'auth/me',
        }),
        login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
            query: payload => {
                return {
                    method: 'POST',
                    url: 'auth/login',
                    body: payload,
                }
            },
        }),
        logout: build.mutation<BaseResponse, void>({
            query: () => {
                return {
                    method: 'DELETE',
                    url: 'auth/login',
                }
            },
        }),
    }),
})

export const {useLoginMutation, useLogoutMutation, useMeQuery} = authApi








export const _authApi = {
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