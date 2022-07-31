import { Grid, Typography } from '@mui/material';

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid 
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
            >
            <Grid item
                xs={ 3 }
                sx={{ 
                    width: { xs: '95%', sm: '75%', md: '60%', lg: '50%' },
                    backgroundColor: 'white', 
                    padding: 3, 
                    borderRadius: 2 }}
                className='box-shadow'
                >
                <Typography variant='h5' sx={{ mb: 1 }}>{ title }</Typography>

                { children }

            </Grid>

        </Grid>

    )
}
