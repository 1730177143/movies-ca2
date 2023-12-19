import React, {useContext} from "react";
import PageTemplate from "../components/templateActorListPage";
import {MoviesContext} from "../contexts/moviesContext";
import {useQueries} from "react-query";
import {getActor} from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFollows from "../components/cardIcons/removeFromFollows";

const FollowsPage = () => {
    const {follows: actorIds} = useContext(MoviesContext);

    // Create an array of queries and run in parallel.
    const followActorQueries = useQueries(
        actorIds.map((actorId) => {
            return {
                queryKey: ["actor", {id: actorId}],
                queryFn: getActor,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = followActorQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner/>;
    }
    console.log(followActorQueries);

    const actors = followActorQueries.map((q) => {
        return q.data
    });

    const toDo = () => true;

    return (
        <PageTemplate
            title="Following Actors"
            actors={actors}
            action={(actor) => {
                return (
                    <>
                        <RemoveFromFollows actor={actor}/>
                    </>
                );
            }}
        />
    );
};

export default FollowsPage;