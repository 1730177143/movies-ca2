import fetch from 'node-fetch';

export const getUpcomingMovies = async (page) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovies = async (page) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovie = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieImages =async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieReviews =async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getTopRated = async (page) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getTrending =async (page) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getRecommendations =async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getPopular =async (page) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1${page}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getSimilar =async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getActors =async (page) => {
    try {
        console.log('page',page)
        const response = await fetch(
            `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getActor =async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getActorImages =async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getMovieCredits =async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getCredits =async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};