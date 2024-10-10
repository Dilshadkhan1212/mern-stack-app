const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const itemRouter=require('../backend/controllers/itemRouter');
const questionRouter=require('./controllers/questionRouter')
const todoRouter=require('./controllers/todoRouter')

const path = require('path');

dotenv.config();

const app=express();
const port=process.env.PORT || 5000;


  app.use(cors({
    origin: 'http://localhost:3000', // Replace this with your frontend URL if needed
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'], // Allow all necessary methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  }));

 app.options('*', cors()); // Enable preflight for all routes 
app.use(express.json());

// MongoDB connection
const dbURI =process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas with Mongoose");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB Atlas with Mongoose:", err);
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api',itemRouter);
app.use('/api',questionRouter);
app.use('/todo',todoRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})