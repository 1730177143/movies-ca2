import React, {useContext} from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcoming } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { useQuery } from 'react-query';
import AddToPlaylistIcon from '../components/cardIcons/playlistAdd'
import {MoviesContext} from "../contexts/moviesContext";

const UpcomingMoviesPage = (props) => {
  const {page} = useContext(MoviesContext);
  const {  data, error, isLoading, isError }  = useQuery(['discoverUpcoming',page], getUpcoming)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const playlist = movies.filter(m => m.necessarywatch)
  localStorage.setItem('playlist', JSON.stringify(playlist))

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}    
    />
    
  );
};
export default UpcomingMoviesPage;