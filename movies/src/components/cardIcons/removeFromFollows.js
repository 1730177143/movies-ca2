import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "../../contexts/moviesContext";
import Button from "@mui/material/Button";
const RemoveFromFollowsIcon = ({ actor }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromFollows = (e) => {
        e.preventDefault();
        context.removeFromFollows(actor);
    };
    return (
        <IconButton
            aria-label="remove from follows"
            onClick={handleRemoveFromFollows}
        >
            <Button variant="outlined" size="small" color="primary">Unfollow</Button>
        </IconButton>
    );
};

export default RemoveFromFollowsIcon;