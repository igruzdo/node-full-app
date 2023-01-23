import { app } from "./app.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config({path: './config.env'});

const DB_URL = process.env.DATABASE_LOCAL

mongoose.connect(DB_URL, {
	useNewUrlParser: true,
}).then(connection => {
	console.log('DB connection OK')
})

const toursSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A tour must have a name'],
		unique: true
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	price: {
		type: Number,
		required: [true, 'A tour must have a price']
	},
});

const Tour = mongoose.model('Tour', toursSchema);

const testTour = new Tour({
	name: 'The park camper',
	price: 299,
})

testTour.save().then(doc => {
	console.log(doc)
}).catch(err => {
	console.log(err)
});

app.listen(process.env.PORT ?? 3000, () => {
	console.log('App running');
});