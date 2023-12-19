import React, {useEffect, useState} from "react";
import {auth} from "../firebase/firebase-config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import {useNavigate} from "react-router-dom";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    const [myReviews, setMyReviews] = useState({})
    const [playlist, setPlaylist] = useState([]);
    const [follows, setFollows] = useState([])
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [page, setPage] = React.useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const getEmail = (email) => {
        setEmail(email);

    };
    const getPassword = (password) => {
        setPassword(password);
    }
    const googleLogin = async () => {
        setError('');
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setEmail(user.email);
            setIsLogin(true);
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
            await signInWithEmailAndPassword(auth, email, password);
            setIsLogin(true);
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
            setIsLogin(false);

        } catch (error) {
            console.error("Authentication failed:", error);
        }
    }
    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
        } else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };
    const addReview = (movie, review) => {
        setMyReviews({...myReviews, [movie.id]: review})
    };

    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
    };
    const addToFollows = (actor) => {
        let newFollows = [];
        if (!follows.includes(actor.id)) {
            newFollows = [...follows, actor.id];
        } else {
            newFollows = [...follows];
        }
        setFollows(newFollows)
    };
    const removeFromFollows = (actor) => {
        setFollows(follows.filter(
            (aId) => aId !== actor.id
        ))
    };
    const addToPlaylist = (movie) => {
        let newToPlay = [];
        if (!playlist.includes(movie.id)) {
            newToPlay = [...playlist, movie.id];
        } else {
            newToPlay = [...playlist];
        }
        setPlaylist(newToPlay);
    };
    const removeFromPlaylist = (movie) => {
        setPlaylist(playlist.filter(
            (mId) => mId !== movie.id
        ))
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                addReview,
                playlist,
                addToPlaylist,
                removeFromPlaylist,
                follows,
                addToFollows,
                removeFromFollows,
                handleLogin,
                handleRegister,
                getPassword,
                getEmail,
                isLogin,
                email,
                logout,
                googleLogin,
                error,
                handlePageChange,
                page,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;