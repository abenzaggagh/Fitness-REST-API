import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/userRoutes';

const PORT = 4000

const app = express();

routes(app);

app.get('/', (req, res) => {
    res.send(`Fitness API - Node & Express Server on ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});