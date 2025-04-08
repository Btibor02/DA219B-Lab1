import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Dish from './models/dish.model.js';
import dishesRouter from './routes/dish.route.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/dishes', dishesRouter);

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log('Connected to database!');
    app.listen(PORT, () => {
    console.log("Server is running on port 5000");
    });
}).catch(() => console.log('Connection failed to database!'));
