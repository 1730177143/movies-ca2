import React, {useContext} from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getPopular } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { useQuery } from 'react-query';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import {MoviesContext} from "../contexts/moviesContext";

const PopularMoviesPage = (props) => {
  const {page} = useContext(MoviesContext);
  const {  data, error, isLoading, isError }  = useQuery(['discoverPopular',page], getPopular)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <PageTemplate
      title='Popular Movies'
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}    
    />
    
  );
};
export default PopularMoviesPage;