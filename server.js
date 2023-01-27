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

app.listen(process.env.PORT ?? 3000, () => {
	console.log('App running');
});