import React, {useState, createContext} from "react";
import {login, signup, loginByGoogle} from "../api/movies-api";
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
    const [error, setError] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState("");
    const [registered, setRegistered] = useState(false);
    const [userId, setUserId] = useState(null);
    //Function to put JWT token in local storage.
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

    const authenticate = async (username, password) => {
        const result = await login(username, password);
        console.log(result);
        if (result.token) {
            console.log(result.userId);
            setToken(result.token);
            setUserId(result.userId);
            setIsAuthenticated(true);
            setUserName(username);
        } else {
            setError(result.msg);
        }
    };

    const register = async (username, password, email) => {
        const result = await signup(username, password, email);
        console.log(result);
        if (result.success) {
            setRegistered(true);
        } else {
            setError(result.msg);
        }
    };
    const byGoogleLogin = async (username, email) => {
        const result = await loginByGoogle(username, email, 'google@123')
        console.log(result);
        if (result.success) {
            setUserId(result.userId);
        } else {
            setError(result.msg);
        }
    }
    const signout = () => {
        setTimeout(() => setIsAuthenticated(false), 100);
    }
    const getEmail = (email) => {
        setEmail(email);

    };
    const getPassword = (password) => {
        setPassword(password);
    }
    const getPasswordAgain = (password) => {
        setPasswordAgain(password);
    }
    const getUserName = (username) => {
        setUserName(username);
    }
    const googleLogin = async () => {
        setError(null);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (result) {
                await byGoogleLogin(user.displayName + '_google', user.email)
            }
            setUserName(user.displayName)
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
            setError(null);
            let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            const validPassword = passwordRegEx.test(password);
            console.log(passwordAgain, validPassword);
            if (email === '') {
                throw new Error("Email cannot be empty.");
            }
            if (password !== passwordAgain) {
                throw new Error("Passwords do not match.");
            }

            if (!validPassword) {
                throw new Error("Invalid password format.");
            }
            await register(userName, password, email);
            if (registered) {
                navigate("/login", {replace: true});
            }

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("This email has already been registered.");
                console.error("This email has already been registered.");
            } else if (error.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters");
                console.error("Password should be at least 6 characters");
            } else {
                setError(error.message);
                console.error("Registration error:", error.message);
            }
        }
    };


    const handleLogin = async () => {
        try {
            setError(null);
            await authenticate(userName, password);
            if (isAuthenticated) {
                navigate("/", {replace: true});
            }
            console.log(userId);
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
                getPasswordAgain,
                error,
                registered,
                setRegistered,
                userId,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;