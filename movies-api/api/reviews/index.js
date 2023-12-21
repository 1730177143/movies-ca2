import express from 'express';
import Review from "./reviewModel";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviews = await Review.find({ movieId: movieId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;