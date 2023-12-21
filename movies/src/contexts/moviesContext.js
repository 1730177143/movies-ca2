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
    postReview,
    getReviewsByID,
    getReviews,
} from "../api/movies-api";
import {useAuth} from './useAuth';

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const {userId} = useAuth();
    const [favorites, setFavorites] = useState([])
    const [myReviews, setMyReviews] = useState({})
    const [review, setReview] = useState({});
    const [allReviews, setAllReviews] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [follows, setFollows] = useState([])
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const addToReview = async (review) => {
        console.log('addToReview', review);
        await postReview(review.author, review.review, review.rating, review.movieId);
    }
    const getReviewById = async (movieId) => {
        const result = await getReviewsByID(movieId);
        await setReview(result);
        console.log('getReviewById', review);
    }
    const getAllReviews = async () => {
        const result = await getReviews();
        setAllReviews(result);
        console.log('getReview', allReviews);
    }
    const loadProfile = async () => {
        await getAllPlaylist();
        await getAllFavorites();
        await getAllFollows();
        await getAllReviews();
    }
    const getAllFavorites = async () => {
        const result = await getFavourites(userId);
        setFavorites(result.favourites);
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
    const addReview = async (movie, review) => {
        setMyReviews({...myReviews, [movie.id]: review})
    };

    const getAllFollows = async () => {
        const result = await getFollows(userId);
        setFollows(result.follows);
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
        setPlaylist(result.playlist);
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
                addToReview,
                getReviewById,
                getAllReviews,
                review,
                allReviews,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;