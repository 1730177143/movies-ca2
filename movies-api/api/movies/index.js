import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getGenres,
    getMovies,
    getPopular,
    getTopRated,
    getTrending,
    getMovie,
    getMovieImages,
    getMovieReviews,
    getRecommendations,
    getSimilar,
    getActors,
    getActor,
    getActorImages,
    getCredits,
    getMovieCredits,
} from '../tmdb-api';

const router = express.Router();

router.get('/tmdb', asyncHandler(async (req, res) => {
    let {page = 1} = req.query
    const upcomingMovies = await getMovies(page);
    res.status(200).json(upcomingMovies);
}));
router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    let {page = 1} = req.query
    const upcomingMovies = await getPopular(page);
    res.status(200).json(upcomingMovies);
}));
router.get('/tmdb/toprated', asyncHandler(async (req, res) => {
    let {page = 1} = req.query
    const upcomingMovies = await getTopRated(page);
    res.status(200).json(upcomingMovies);
}));
router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    let {page = 1} = req.query
    const upcomingMovies = await getTrending(page);
    res.status(200).json(upcomingMovies);
}));
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    let {page = 1} = req.query
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
}));
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/tmdb/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));
router.get('/tmdb/img/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovieImages(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));
router.get('/tmdb/reviews/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovieReviews(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));
router.get('/tmdb/recommendations/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getRecommendations(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));
router.get('/tmdb/similar/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getSimilar(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/actors',asyncHandler( async (req, res) => {
    let page  = req.query.page;
    console.log('page0',page);
    const actors = await getActors(page);
    res.status(200).json(actors);
}));

router.get('/tmdb/actor/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getActor(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The actor you requested could not be found.', status_code: 404});
    }
}));
router.get('/tmdb/actor/img/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getActorImages(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));
router.get('/tmdb/credits/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getCredits(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The actors you requested could not be found.', status_code: 404});
    }
}));
router.get('/tmdb/movieCredits/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovieCredits(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));
export default router;