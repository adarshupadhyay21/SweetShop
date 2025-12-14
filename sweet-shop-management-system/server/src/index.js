const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });