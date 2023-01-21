import express from 'express';
import morgan from 'morgan';
import {router as usersRouter} from './routes/userRoutes.js';
import {router as toursRouter} from './routes/tourRoutes.js';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';


dotenv.config({path: './config.env'});
export const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//1) Middlewares______________________________________________________________________________
if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`))

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
