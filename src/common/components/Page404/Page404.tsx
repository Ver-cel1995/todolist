import s from './Page404.module.css'
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export const Page404 = () => {
    return (
        <>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <h1 className={s.title}>404</h1>
                    <h2 className={s.subTitle}>page not found</h2>
                    <Button type={'submit'} variant={'contained'} color={'primary'} component='a' href={'/'}> На главную страницу </Button>
                </Grid>
            </Grid>
        </>
    )
}