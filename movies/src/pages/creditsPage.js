import React, {useEffect} from "react";
import {getCredits} from "../api/tmdb-api";
import PageTemplate from '../components/templateActorListPage';
import {useQuery} from 'react-query';
import Spinner from '../components/spinner';
import {useParams} from "react-router-dom";

const HomePage = (props) => {
    const {id} = useParams();
    const {data, refetch, error, isLoading, isError} = useQuery(["actor", {id: id}], getCredits);
    console.log(data);
    useEffect(() => {
        if (!data || !data.cast[0].name) {
            refetch();
        }
    }, [data, refetch]);
    if (isLoading) {
        return <Spinner/>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    if (!data || !data.cast[0].name) {
        return <Spinner/>; // 或者返回某种“无数据”或“加载中”的提示
    }
    const actors = data.cast;

    return (
        <PageTemplate
            title="Credits"
            actors={actors}
            action={(actor) => {
            }}
        />
    );
};
export default HomePage;