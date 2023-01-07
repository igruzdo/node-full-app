import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message: 'hello from server side!!!'})
});

const port = 3000;

app.listen(port, () => {
    console.log('App running')
});