import * as fs from 'node:fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

export const checkId = (req, res, next, val) => {
	const tour = tours.find(el => el.id === +val);
	if(!tour) {
		return res.status(404).json({
			status: 'fail',
			message: `No such tour with id ${val}`
		})
	} else {
		req.tour = tour;
	}
	next();
}

export const checkBody = (req, res, next) => {
	if(!req.body.name || !req.body.price) {
		return res.status(404).json({
			status: 'fail',
			message: `Dosen't recived data in body`
		})
	}
	next();
}


export const getAllTours = (req, res) => {

	console.log(req.requestTime)

	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours
		}
	});
}

export const getTourById = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			tours: [req.tour]
		}
	});
}

export const createTour = (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({
		id: newId,
	}, req.body);

	tours.push(newTour);
	fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
		res.status(201).json({
			status: 'success',
			data: {
				tour: newTour
			}
		});
	})
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