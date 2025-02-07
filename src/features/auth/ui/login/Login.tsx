import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {selectThemeMode} from '../../../../app/appSelectors'
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {getTheme} from "../../../../common/theme/theme";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import s from './Login.module.css'
import {selectAuth, setIsLoggedIn} from "../../model/authSlice";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {Path} from "../../../../common/routing/Routing";
import {useLoginMutation} from "../../api/authApi";
import {ResultCode} from "../../../../common/enums/enums";

export type LoginInputs = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const Login = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()

    const [login] = useLoginMutation()

    const auth = useAppSelector(selectAuth)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<LoginInputs>({defaultValues: {email: '', password: '', rememberMe: false}})

    const onSubmit: SubmitHandler<LoginInputs> = data => {
        login(data)
            .then((res) => {
                if (res.data?.resultCode === ResultCode.Success) {
                    dispatch(setIsLoggedIn({ isLoggedIn: true }))
                    localStorage.setItem("sn-token", res.data.data.token)
                }
            })
            .finally(() => {
                reset()
            })
    }


    useEffect(() => {
        if (auth) {
            navigate(Path.Main)
        }
    }, [auth])


    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To login get registered
                            <a
                                style={{color: theme.palette.primary.main, marginLeft: '5px'}}
                                href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}
                                rel="noreferrer"
                            >
                                here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>
                            <b>Email:</b> free@samuraijs.com
                        </p>
                        <p>
                            <b>Password:</b> free
                        </p>
                    </FormLabel>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...register('email',
                                    {
                                        required: 'email si required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: 'Incorrect email address'
                                        }
                                    })}/>
                            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...register('password', {
                                    required: 'password si required',
                                    pattern: {
                                        value: /^[A-Za-z\d]{5,10}$/,
                                        message: 'Incorrect password'
                                    }
                                })}/>
                            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Controller
                                        name={'rememberMe'}
                                        control={control}
                                        rules={{required: 'checkbox is required'}}
                                        render={({field: {value, ...rest}}) => <Checkbox {...rest} checked={value}/>}
                                    />}
                            />
                            {errors.rememberMe && <span className={s.errorMessage}>{errors.rememberMe.message}</span>}
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    )
}