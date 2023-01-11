import express from 'express';
import * as fs from 'node:fs';
import path from 'path';
import url from 'url';
import morgan from 'morgan';

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//1) Middlewares______________________________________________________________________________
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
	console.log('Middleware');
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//2) Route heandlers____________________________________________________________________________
const getAllTours = (req, res) => {

	console.log(req.requestTime)

	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours
		}
	});
}

const getTourById = (req, res) => {
	const tour = tours.find(el => el.id === +req.params.id);
	if(!tour) {
		return res.status(404).json({
			status: 'fail',
			message: `No such tour with id ${req.params.id}`
		})
	}

	res.status(200).json({
		status: 'success',
		data: {
			tours: [tour]
		}
	});
}

const createTour = (req, res) => {
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

const updateTour = (req, res) => {

	const tour = tours.find(el => el.id === +req.params.id);
	if(!tour) {
		return res.status(404).json({
			status: 'fail',
			message: `No such tour with id ${req.params.id}`
		})
	}


	res.status(200).json({
		status: 'success',
		data: {
			tours: []
		}
	})
}

const deleteTour = (req, res) => {
	const tour = tours.find(el => el.id === +req.params.id);
	if(!tour) {
		return res.status(404).json({
			status: 'fail',
			message: `No such tour with id ${req.params.id}`
		})
	}


	res.status(204).json({
		status: 'success',
		data: null
	})
}

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTourById);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//3) Routes__________________________________________________________________________________

app.route('/api/v1/tours')
	.get(getAllTours)
	.post(createTour);

app.route('/api/v1/tours/:id')
	.get(getTourById)
	.patch(updateTour)
	.delete(deleteTour);

//4) Start server ___________________________________________________________________________
const port = 3000;

app.listen(port, () => {
	console.log('App running');
});