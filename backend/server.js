
// require('dotenv').config();
// const express = require('express');
// import dotenv from 'dotenv';

import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import Routes from "./routes/workouts.js";
import mongoose from'mongoose';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', Routes);

// connect to mongodb   
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    // listening for requests
    app.listen(PORT, () => {
        console.log('Server is running on port and Connected to MongoDB', PORT);
    });
    console.log();
})
.catch(err => {
    console.log(err);
});
