import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type Props = {
    onCreateItem: (title: string) => void
};
export const CreateItemForm = ({onCreateItem}:Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeTitleTaskHandler = (event: ChangeEvent<HTMLInputElement> ) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }


    const addTaskHandler = () => {
        if (title.trim() !== '') {
            onCreateItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    return (
        <div>
            <TextField error={!!error}
                       label={error ? error : "Enter a title"}
                       variant="outlined"
                       onChange={changeTitleTaskHandler}
                       onKeyDown={createTaskOnEnterHandler}
                       size={'small'}
                       value={title}
            />
            <IconButton onClick={addTaskHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
        </div>
    );
};