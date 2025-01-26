import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {BaseResponse} from "../types/types";

export const handleServerAppError = <T,>(data: BaseResponse<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}