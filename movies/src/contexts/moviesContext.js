import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    addToPlaylist as apiAddToPlaylist,
    getPlaylist,
    removeFromPlaylist as apiRemoveFromPlaylist,
    addToFavourites as apiAddToFavourites,
    removeFromFavourites as apiRemoveFromFavourites,
    getFavourites,
    addToFollows as apiAddToFollows,
    removeFollows as apiRemoveFollows,
    getFollows,
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

    const loadProfile = async () => {
        await getAllPlaylist();
        await getAllFavorites();
        await getAllFollows();
    }
    const getAllFavorites = async () => {
        const result = await getFavourites(userId);
        await setFavorites(result.favourites);
        console.log('getAllFavorites', favorites);
    }
    const addToFavorites = async (movie) => {
        if (!favorites.includes(movie.id)) {
            try {
                await apiAddToFavourites(userId, movie.id);
                await getAllFavorites()
            } catch (error) {
                console.error(error);
            }
        }
    };

    const removeFromFavorites = async (movie) => {
        await apiRemoveFromFavourites(userId, movie.id);
        await getAllFavorites();
    };
    const addReview = (movie, review) => {
        setMyReviews({...myReviews, [movie.id]: review})
    };

    const getAllFollows = async () => {
        const result = await getFollows(userId);
        await setFollows(result.follows);
        console.log('getAllFollows', follows);
    }

    const addToFollows = async (actor) => {
        if (!follows.includes(actor.id)) {
            try {
                await apiAddToFollows(userId, actor.id);
                await getAllFollows()
            } catch (error) {
                console.error(error);
            }
        }
    };
    const removeFromFollows = async (actor) => {
        await apiRemoveFollows(userId, actor.id);
        await getAllFollows()
    };
    const getAllPlaylist = async () => {
        const result = await getPlaylist(userId);
        await setPlaylist(result.playlist);
        console.log('getAllPlaylist', playlist)
    }
    const addToPlaylist = async (movie) => {
        if (!playlist.includes(movie.id)) {
            try {
                await apiAddToPlaylist(userId, movie.id);
                await getAllPlaylist()
            } catch (error) {
                console.error(error);
            }
        }
    }
    const removeFromPlaylist = async (movie) => {
        await apiRemoveFromPlaylist(userId, movie.id);
        await getAllPlaylist();
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