import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    addToPlaylist as apiAddToPlaylist,
    getPlaylist,
    removeFromPlaylist as apiRemoveFromPlaylist
} from "../api/movies-api";
import {useAuth} from './useAuth';

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const {userId} = useAuth();
    const [favorites, setFavorites] = useState([])
    const [myReviews, setMyReviews] = useState({})
    const [playlist, setPlaylist] = useState([]);
    const [follows, setFollows] = useState([])
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const loadProfile = () => {
        getAllPlaylist();
        // getAllFavorites();
        // getAllFollows();
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
    const getAllPlaylist = async () => {
        const result = await getPlaylist(userId);
        let newPlaylist = [];
        newPlaylist = result.playlist == null ? [] : result.playlist;
        setPlaylist(newPlaylist);
    }
    const addToPlaylist = async (movie) => {
        if (!playlist.includes(movie.id)) {
            try {
                console.log(userId);
                const result = await apiAddToPlaylist(userId, movie.id);
                console.log(result);
                setPlaylist(playlist => [...playlist, movie.id]);
            } catch (error) {
                console.error(error);
            }
        }
    }
    const removeFromPlaylist = (movie) => {
        apiRemoveFromPlaylist(userId, movie.id);
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
                error,
                page,
                handlePageChange,
                getAllPlaylist,
                loadProfile,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;