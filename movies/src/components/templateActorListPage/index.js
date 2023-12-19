import React, {useContext, useState} from "react";
import Header from "../headerActorList";
import FilterCard from "../filterActorsCard";
import ActorList from "../actorList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import {MoviesContext} from "../../contexts/moviesContext";

function ActorListPageTemplate({ actors, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    const {page, handlePageChange} = useContext(MoviesContext);
    let displayedActors = actors
        .filter((m) => {
            return m.name && m.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        });

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
    };

    return (
        <Grid container sx={{ padding: '20px' }}>
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>
            <Box display="flex" justifyContent="center" mx='auto'>
                <Pagination count={100} page={page} onChange={handlePageChange} color="primary"/>
            </Box>
            <Grid item container spacing={5}>
                <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <FilterCard
                        onUserInput={handleChange}
                        nameFilter={nameFilter}
                    />
                </Grid>
                <ActorList action={action} actors={displayedActors}></ActorList>
            </Grid>
            <Box display="flex" justifyContent="center" mx='auto'>
                <Pagination count={100} page={page} onChange={handlePageChange} color="primary"/>
            </Box>
        </Grid>
    );
}
export default ActorListPageTemplate;