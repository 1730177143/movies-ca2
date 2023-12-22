import React, {useContext} from 'react';
import {Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {Navigate, useNavigate} from "react-router-dom";
import {AuthContext} from '../../contexts/authContext';
import GoogleIcon from '@mui/icons-material/Google';
import Alert from "@mui/material/Alert";
import {MoviesContext} from "../../contexts/moviesContext";

function Login() {
    const movieContext = useContext(MoviesContext);
    const context = useContext(AuthContext);
    const {userName, password, error, isAuthenticated,registered} = useContext(AuthContext);
    const navigate = useNavigate();
    const registerButton = () => {
        navigate("/register", {replace: true});
    }
    if (registered) {
        context.setRegistered(false);
    }
    if (isAuthenticated === true) {

        movieContext.loadProfile();
        return <Navigate to="/"/>;
    }
    return (
        <Grid container style={{minHeight: '100vh'}}>
            <Grid item xs={12} sm={6} md={4} style={{margin: 'auto'}}>
                <Paper style={{padding: 20, marginTop: 8}}>
                    <Typography variant="h5" align="center" margin="dense">
                        Login
                    </Typography>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        context.handleLogin();
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
                            label="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => context.getPassword(e.target.value)}
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
                            Login
                        </Button>
                    </form>
                    <Typography align="center">
                        <Button>< GoogleIcon
                            onClick={(e) => context.googleLogin()}
                        /></Button>
                        No account ? <Button type="register"
                                             color="primary"
                                             variant="contained"

                                             onClick={() => {
                                                 registerButton()
                                             }}>Sign in</Button>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Login;
