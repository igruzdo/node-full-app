import { Tour } from "../models/tourModel";

export const getAllTours = (req, res) => {

	res.status(200).json({
		status: 'success',
		// results: tours.length,
		// data: {
		// 	tours
		// }
	});
}

export const getTourById = (req, res) => {
	// res.status(200).json({
	// 	status: 'success',
	// 	data: {
	// 		tours: [req.tour]
	// 	}
	// });
}

export const createTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				tour: newTour
			}
		});
	} catch(err) {
		res.status(400).json({
			status: 'fail',
			message: 'Invalid data'
		})
	}
}

export const updateTour = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			tours: []
		}
	})
}

export const deleteTour = (req, res) => {
	res.status(204).json({
		status: 'success',
		data: null
	})
}