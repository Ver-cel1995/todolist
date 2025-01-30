import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {SyntheticEvent} from "react";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectAppError} from "../../../app/appSelectors";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setAppError} from "../../../app/appSlice";


type Props = {

};
export const ErrorSnackbar = (props: Props) => {

    const error = useAppSelector(selectAppError)
    const dispatch = useAppDispatch()

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setAppError({error: null}));
    }

    return (
        <div>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};