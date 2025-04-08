import {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';


type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({ value, onChange }: Props) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(value)

    const onDoubleClickHandler = () => {
        setIsEditMode(!isEditMode);
    }

    const onBlurHandler = () => {
        setIsEditMode(!isEditMode);
        onChange(title);

    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {isEditMode
                ? <TextField id="standard-basic" variant="standard" value={title} onBlur={onBlurHandler} autoFocus onChange={changeTitle} defaultValue="Small" size="small"/>
                : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
            }
        </>
    )
}

// <input type="text" value={title} onBlur={onBlurHandler} autoFocus onChange={changeTitle}/>