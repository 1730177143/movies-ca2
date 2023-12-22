export const getMovies = async (args) => {
    const [, page] = args.queryKey;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb?page=${page}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'Get',
        }
    )
    return response.json();
};

export const getMovie = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/${id}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getGenres = async () => {
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/genres`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'Get',
        }
    )
    return response.json();
};

export const getMovieImages = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/img/${id}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    })
        .catch((error) => {
            throw error
        });
};

export const getMovieReviews = (id) => {
    return fetch(
        `http://localhost:8080/api/movies/tmdb/reviews/${id}`)
        .then((res) => res.json())
        .then((json) => {
            // console.log(json.results);
            return json.results;
        });
};
export const getUpcoming = async (args) => {
    const [, page] = args.queryKey;
    const response = await fetch(
        `http://localhost:8080/api/movies/tmdb/upcoming?page=${page}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'Get',
        }
    )
    return response.json();
};
export const getTopRated = (args) => {
    const [, page] = args.queryKey;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/toprated?page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getTrending = (args) => {
    const [, page] = args.queryKey;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/trending?page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getRecommendations = (args) => {
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/recommendations/${id}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getPopular = (args) => {
    const [, page] = args.queryKey;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/popular?page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getSimilar = (args) => {
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/similar/${id}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getActors = (args) => {
    const [, page] = args.queryKey;
    return fetch(
        // `http://localhost:8080/api/movies/tmdb/actors?page=${page}`
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`

    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getActor = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/actor/${id}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getActorImages = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/actor/img/${id}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    })
        .catch((error) => {
            throw error
        });
};
export const getMovieCredits = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/movieCredits/${id}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getCredits = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/movies/tmdb/credits/${id}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};