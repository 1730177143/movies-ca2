import React, { useState, createContext } from "react";
import { login, signup } from "../api/movies-api";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import {auth} from "../firebase/firebase-config";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    //Function to put JWT token in local storage.
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

    const authenticate = async (username, password) => {
        const result = await login(username, password);
        if (result.token) {
            setToken(result.token)
            setIsAuthenticated(true);
            setUserName(username);
        }
    };

    const register = async (username, password) => {
        const result = await signup(username, password);
        console.log(result.code);
        return (result.code === 201);
    };

    const signout = () => {
        setTimeout(() => setIsAuthenticated(false), 100);
    }
    const getEmail = (email) => {
        setEmail(email);

    };
    const getPassword = (password) => {
        setPassword(password);
    }
    const getUserName = (username) => {
        setUserName(username);
    }
    const googleLogin = async () => {
        setError('');
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setEmail(user.email);
            setIsAuthenticated(true);
            console.log("Login in success,user information:", user);
            navigate("/", {replace: true});
        } catch (error) {
            console.error("Google login in failed:", error);
        }
    }
    const handleRegister = async () => {
        try {
            setError('');
            await createUserWithEmailAndPassword(auth, email, password);

            navigate("/login", {replace: true});
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("This email has already been registered.");
                console.error("This email has already been registered.");
            } else if (error.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters");
                console.error("Password should be at least 6 characters");
            } else {
                console.error("Authentication failed:", error);
            }
        }
    };

    const handleLogin = async () => {
        try {
            setError('');
            authenticate(userName, password);
            setIsAuthenticated(true);
            navigate("/", {replace: true});

        } catch (error) {
            if (error.code === "auth/invalid-login-credentials") {
                setError("This email has already been registered by Google.");
                console.error("This email has already been registered by Google.");
            } else {
                console.error("Authentication failed:", error);
            }
        }
    };
    const logout = async () => {
        try {
            await auth.signOut();
            setIsAuthenticated(false);

        } catch (error) {
            console.error("Authentication failed:", error);
        }
    }
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                register,
                signout,
                userName,
                getPassword,
                getEmail,
                email,
                logout,
                googleLogin,
                handleLogin,
                handleRegister,
                getUserName,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;