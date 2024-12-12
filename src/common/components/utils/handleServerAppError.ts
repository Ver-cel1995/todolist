
import { AppDispatch } from "../../../app/store"
import { BaseResponse } from "common/types"
import { setAppError, setAppStatus } from "../../../app/appSlice"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch ) => {
  dispatch(setAppStatus({status: "failed" }))
  dispatch(setAppError({ error: data.messages.length ? data.messages[0] : "some error occurred" })) // избыточная проверка
}