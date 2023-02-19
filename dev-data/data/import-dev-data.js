import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { Tour } from '../../models/tourModel.js';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: './config.env'});

const DB_URL = process.env.DATABASE_LOCAL

console.log('DB_URL', DB_URL)

mongoose.connect(DB_URL, {
	useNewUrlParser: true,
}).then(connection => {
	console.log('DB connection OK')
})

const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');
console.log(JSON.parse(tours))

const importData = async () => {
    try{
        await Tour.create(JSON.parse(tours));
        console.log('Data successfuly loaded!');
        process.exit();
    } catch(err) {
        console.log(err);
    }
}

const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfuly deleted!');
        process.exit();
    } catch(err) {
        console.log(err);
    }
}

if(process.argv[2] === '--import') {
    importData();
} else if(process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv)