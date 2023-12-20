import React, {useContext, useEffect} from 'react';
import {Button, TextField, Grid, Paper, Typography} from '@mui/material';
import Alert from '@mui/material/Alert';
import {AuthContext} from "../../contexts/authContext";
import {Navigate} from "react-router-dom";

function Register() {
    const context = useContext(AuthContext);
    const {userName, email, password, error, passwordAgain, registered} = useContext(AuthContext);
    if (registered === true) {
        return <Navigate to="/login"/>;
    }

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
                            label="userName"
                            type="userName"
                            fullWidth
                            margin="normal"
                            value={userName}
                            onChange={(e) => context.getUserName(e.target.value)}
                        />
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
                        <TextField
                            label="passwordAgain"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={passwordAgain}
                            onChange={(e) => context.getPasswordAgain(e.target.value)}
                        />
                        {<Typography color="error">
                            {error && <Alert severity="error">{error}</Alert>}
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
