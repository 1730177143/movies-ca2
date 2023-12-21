import React, {useContext, useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {excerpt} from "../../util";
import {MoviesContext} from "../../contexts/moviesContext";
import {useQuery} from "react-query";
import {getMovie} from "../../api/tmdb-api";

export default function Review() {
    const ratingWord = ["Terrible", "Poor", "Average", "Good", "Excellent"]
    const {allReviews, getAllReviews} = useContext(MoviesContext);
    useEffect(() => {
        getAllReviews();
    }, []);

    if (!allReviews || allReviews.length === 0) {
        return <div>Loading reviews...</div>;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 550}} aria-label="reviews table">
                <TableHead>
                    <TableRow>
                        <TableCell>Movie ID</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell align="center">Reviews</TableCell>
                        <TableCell >Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allReviews.map((r) => (
                        <TableRow key={r._id}>
                            <TableCell>{r.movieId}</TableCell>
                            <TableCell component="th" scope="row">
                                {r.author}
                            </TableCell>
                            <TableCell>{excerpt(r.review)}</TableCell>
                            <TableCell>
                                {ratingWord[r.rating - 1]}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}