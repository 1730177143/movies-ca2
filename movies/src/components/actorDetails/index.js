import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import CakeIcon from '@mui/icons-material/Cake';

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = {margin: 0.5};

const ActorDetails = ({actor}) => {  // Don't miss this!

    return (
        <>
            <Typography variant="h5" component="h3">
                Biography
            </Typography>

            <Typography variant="h6" component="p">
                {actor.biography}
            </Typography>

            <Paper component="ul" sx={{...root}}>
                <Chip icon={<CakeIcon/>} label={`${actor.birthday
                }`}/>
                <Chip
                    icon={<CakeIcon/>}
                    label={actor.place_of_birth===null ?'unknown':`${actor.place_of_birth.toLocaleString()}`}
                />
            </Paper>
            <Paper
                component="ul"
                sx={{...root}}
            >
                <li>
                    <Chip label="known for department" sx={{...chip}} color="primary"/>
                </li>
                <li>
                    <Chip label={`${actor.known_for_department}`} sx={{...chip}}/>
                </li>
            </Paper>
            <Link to={`/movieCredits/${actor.id}`}>
                <Fab
                    color="secondary"
                    variant="extended"
                    sx={{
                        position: 'fixed',
                        bottom: '1em',
                        right: '1em'
                    }}
                >
                    <NavigationIcon/>
                    relational movies
                </Fab>
            </Link>=
        </>
    );
};
export default ActorDetails;