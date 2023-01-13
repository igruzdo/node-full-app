import express from 'express';
import morgan from 'morgan';
import {router as usersRouter} from './routes/userRoutes.js';
import {router as toursRouter} from './routes/tourRoutes.js';

export const app = express();


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


//3) Routes__________________________________________________________________________________

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

//4) Start server ___________________________________________________________________________
