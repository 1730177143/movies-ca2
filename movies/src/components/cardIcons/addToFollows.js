import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const AddToFollowsIcon = ({ actor }) => {
    const context = useContext(MoviesContext);

    const handleAddToFollows = (e) => {
        e.preventDefault();
        context.addToFollows(actor);
    };

    return (
        <IconButton aria-label="add to follows" onClick={handleAddToFollows}>
            <Button  variant="outlined" size="small" color="primary" >Follow</Button>
        </IconButton>
    );
};

export default AddToFollowsIcon;