// import dotenv from 'dotenv';
// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';

// const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// require('dotenv').config()
// Express Application
const app = express();

// Environment Variables
// dotenv.config()

import { port, url } from './src/configuration';

import userRoutes from './src/routers/userRoutes';
// import habitRoutes from './src/routers/habitRoutes';

mongoose.connect(url, 
    { useNewUrlParser: true, useCreateIndex: true }
);

// BodyParser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// API Routes
userRoutes(app);
// habitRoutes(app);

app.get('/', (req, res) => {
    res.send(`Fitness API - Node & Express Server on ${port}`)
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${port} `)
});