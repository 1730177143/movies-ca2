import PageTemplate from '../components/templateMovieListPage'
import {getSimilar} from "../api/tmdb-api";
import Spinner from '../components/spinner';
import {useQuery} from 'react-query';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";

const SimilarPage = (props) => {
        // const [movies, setMovies] = useState([]);
        const {id} = useParams();
        const {data, error, isLoading, isError, refetch} = useQuery(
            ["movie", {id: id}], getSimilar
        );

        useEffect(() => {
            if (!data || !data.results) {
                refetch();
            }
        }, [data, refetch]); // 依赖于 data 和 refetch

        if (isLoading) {
            return <Spinner/>
        }

        if (isError) {
            return <h1>{error.message}</h1>
        }
    if (!data || !data.results) {
        return <Spinner />; // 或者返回某种“无数据”或“加载中”的提示
    }
        const movies = data.results;
        console.log(movies);
        return (
            <PageTemplate
                title='Similar Movies'
                movies={movies}
                action={(movie) => <AddToFavoritesIcon movie={movie}/>}
            />
        );
    }
;
export default SimilarPage;