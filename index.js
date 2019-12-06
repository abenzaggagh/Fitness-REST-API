import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRoutes from './src/routers/userRoutes';
// import habitRoutes from './src/routers/habitRoutes';

// Environment Variables
dotenv.config()

// Express Application
const app = express();

// MongoDB Connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.URL, { promiseLibrary: global.Promise });

// BodyParser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// API Routes
userRoutes(app);
// habitRoutes(app);

app.get('/', (req, res) => {
    res.send(`Fitness API - Node & Express Server on ${process.env.PORT}`)
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
});