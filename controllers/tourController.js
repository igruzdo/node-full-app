import { Tour } from "../models/tourModel.js";

export const getAllTours = async (req, res) => {
	try{
		//filtering
		const queryObj = {...req.query};
		const executedFields = ['page', 'sort', 'limit', 'fields'];

		executedFields.forEach(field => {
			delete queryObj[field]
		});


		//advanced filtering
		let queryString = JSON.stringify(queryObj);
		queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

		const query = Tour.find(JSON.parse(queryString));
		const tours =  await query;

		res.status(200).json({
			status: 'success',
			results: tours.length,
			data: {
				tours
			}
		});
	} catch(err) {
		res.status(404).json({
			status: 'fail',
			message: err
		})
	}
}

export const getTourById = async (req, res) => {

	try{
		const tour =  await Tour.findById(req.params.id)
		res.status(200).json({
			status: 'success',
			data: {
				tour
			}
		});
	} catch(err) {
		res.status(404).json({
			status: 'fail',
			message: err
		})
	}
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
			message: err
		})
	}
}

export const updateTour = async (req, res) => {
	try {

		const tour =  await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		})

		res.status(200).json({
			status: 'success',
			data: {
				tour
			}
		})
	} catch(err) {
		res.status(400).json({
			status: 'fail',
			message: err
		})
	}

}

export const deleteTour = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id)
		res.status(200).json({
			status: 'success',
		})
	} catch(err) {
		res.status(400).json({
			status: 'fail',
			message: err
		})
	}
}