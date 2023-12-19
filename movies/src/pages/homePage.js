import React, {useContext, useEffect} from "react";
import {getMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import {useQuery} from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import {MoviesContext} from "../contexts/moviesContext";


const HomePage = (props) => {
    const {page} = useContext(MoviesContext);
    const {data, refetch, error, isLoading, isError} = useQuery(
        ['discover', page], getMovies);


    useEffect(() => {
        if (!data || !data.results[0].title) {
            refetch();
        }
    }, [data, refetch]); // 依赖于 data 和 refetch
    if (isLoading) {
        return <Spinner/>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    if (!data || !data.results[0].title) {
        return <Spinner/>; // 或者返回某种“无数据”或“加载中”的提示
    }
    console.log("1")
    console.log(data);
    const movies = data.results;
    console.log("2")
    console.log(movies);
    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    const addToFavorites = (movieId) => true

    return (
        <PageTemplate
            title="Discover Movies"
            movies={movies}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie}/>
            }}
        />
    );
};
export default HomePage;