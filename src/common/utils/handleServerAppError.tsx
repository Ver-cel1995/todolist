import {setAppError, setAppStatus} from "../../app/appSlice";
import {Dispatch} from "redux";
import {BaseResponse} from "../types/types";

export const handleServerAppError = <T,>(data: BaseResponse<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Some error occurred'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}