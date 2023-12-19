import React, {useContext, useState} from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';
import {MoviesContext} from "../../contexts/moviesContext";
import Box from '@mui/material/Box';

function MovieListPageTemplate({movies, title, action}) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const genreId = Number(genreFilter);
    const {page, handlePageChange} = useContext(MoviesContext);
    let displayedMovies = movies
        .filter((m) => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        });

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else setGenreFilter(value);
    };

    return (
        <Grid container sx={{padding: '20px'}}>
            <Grid item xs={12}>
                <Header title={title}/>
            </Grid>
            <Box display="flex" justifyContent="center" mx='auto'>
                <Pagination count={100} page={page} onChange={handlePageChange} color="primary"/>
            </Box>
            <Grid item container spacing={5}>
                <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies}></MovieList>
            </Grid>
            <Box display="flex" justifyContent="center" mx='auto'>
                <Pagination count={100} page={page} onChange={handlePageChange} color="primary"/>
            </Box>
        </Grid>
    );
}

export default MovieListPageTemplate;