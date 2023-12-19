import React, {useEffect} from "react";
import {getMovieCredits, getMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import {useQuery} from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import {useParams} from "react-router-dom";

const MovieCreditsPage = (props) => {
    const {id} = useParams();
    const {data, refetch, error, isLoading, isError} = useQuery(
        ["movie", {id: id}], getMovieCredits);

    useEffect(() => {
        if (!data ||!data.cast[0]||!data.cast[0].title) {
            refetch();
        }
    }, [data, refetch]); // 依赖于 data 和 refetch
    if (isLoading) {
        return <Spinner/>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    if (!data || !data.cast[0].title) {
        return <Spinner/>; // 或者返回某种“无数据”或“加载中”的提示
    }

    const movies = data.cast;
    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    return (
        <PageTemplate
            title="Movie Credits"
            movies={movies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie}/>
            }}
        />
    );
};
export default MovieCreditsPage;