import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { SyntheticEvent } from "react"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectError, setAppError } from "../../../app/appSlice"

export const ErrorSnackbar = () => {

const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setAppError({error: null }))

  };

  return (
      <Snackbar open={error != null} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
  );
}
