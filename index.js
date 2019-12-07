import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import userRoutes from './src/routers/userRoutes';
// import habitRoutes from './src/routers/habitRoutes';


// Environment Variables
dotenv.config()

// Express Application
const app = express();

// TODO: Change the mongoose to the MongoDB driver or at least reference more about the diff...
// MongoDB Connection
// mongoose.Promise = global.Promise
// let mongoClient = null;
// MongoDB instance not working I guess, I will replace it with the old way.
// MongoClient.connect(process.env.URL, { useNewUrlParser: true, }, function (err, client) {

//     if(err) throw err;

//     mongoClient = client;
// });

mongoose.connect(process.env.URL, { useNewUrlParser: true });

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