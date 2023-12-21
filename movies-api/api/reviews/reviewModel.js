import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({

    author: {type: String, required: true},
    review: {type: String, required: true},
    rating: {type: Number, required: true, min: 1, max: 5},
    movieId: {type: Number, required: true},
}, {
    timestamps: true
});

export default mongoose.model('Review', ReviewSchema);