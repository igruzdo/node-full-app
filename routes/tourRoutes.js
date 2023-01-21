import express from 'express';
import { 
    checkBody,
    checkId,
    createTour, 
    deleteTour, 
    getAllTours, 
    getTourById, 
    updateTour 
} from '../controllers/tourController.js';

export const router = express.Router();

router.param('id', checkId)

router.route('/')
	.get(getAllTours)
	.post(checkBody, createTour);

router.route('/:id')
	.get(getTourById)
	.patch(updateTour)
	.delete(deleteTour);
