import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import {Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import React, {useContext} from "react";
import {MoviesContext} from "../../contexts/moviesContext";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import IconButton from "@mui/material/IconButton";

export default function ActorCard({actor, action}) {
    const {follows, addToFollows} = useContext(MoviesContext);

    if (follows.find((id) => id === actor.id)) {
        actor.follow = true;
    } else {
        actor.follow = false
    }
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    actor.follow ? (
                            <Button variant="outlined" size="small" color="primary">
                                following</Button>
                    ) : null
                }
                title={
                    <Typography variant="h5" component="p">
                        {actor.name}{" "}
                    </Typography>
                }
            />
            <CardMedia
                sx={{height: 500}}
                image={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p">
                            <WhatshotIcon fontSize="small"/>
                            {actor.popularity}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                {action(actor)}
                <Link to={`/actors/${actor.id}`}>
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}