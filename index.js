import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './src/routers/userRoutes';
// import habitRoutes from './src/routers/habitRoutes';

// Server PORT
const PORT = 4000

// Express Application
const app = express();

// MongoDB Connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/fitness', {
    useMongoClient: true
});

// BodyParser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// API Routes
userRoutes(app);
// habitRoutes(app);

app.get('/', (req, res) => {
    res.send(`Fitness API - Node & Express Server on ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});