import express from 'express';
import ratingController from '../Controller/RatingController';

const rating = express.Router();
rating.post('/create', ratingController.postRatings);

export default rating;
