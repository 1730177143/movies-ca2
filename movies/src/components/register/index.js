import React, {useContext} from 'react';
import {Button, TextField, Grid, Paper, Typography} from '@mui/material';

import {MoviesContext} from "../../contexts/moviesContext";
import Alert from '@mui/material/Alert';

function Register() {
    const context = useContext(MoviesContext);
    const {email, password, error} = useContext(MoviesContext);


    return (
        <Grid container style={{minHeight: '100vh'}}>
            <Grid item xs={12} sm={6} md={4} style={{margin: 'auto'}}>
                <Paper style={{padding: 20, marginTop: 8}}>
                    <Typography variant="h5" align="center" margin="dense">
                        Register
                    </Typography>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        context.handleRegister(e);
                    }}>
                        <TextField
                            label="email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => context.getEmail(e.target.value)}
                        />
                        <TextField
                            label="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => context.getPassword(e.target.value)}
                        />
                        {<Typography color="error">
                            {error === '' ? null : <Alert severity="error">{error}</Alert>}
                        </Typography>}
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            fullWidth
                            style={{margin: '24px 0'}}
                        >
                            Register
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Register;
