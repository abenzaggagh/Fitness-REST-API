import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import MongoClient from 'mongoose';

import userRoutes from './src/routers/userRoutes';
// import habitRoutes from './src/routers/habitRoutes';


// Environment Variables
dotenv.config()

// Express Application
const app = express();

// MongoDB Connection
// mongoose.Promise = global.Promise
let mongoClient = null;
MongoClient.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true  }, function (err, client) {
    mongoClient = client;
});

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