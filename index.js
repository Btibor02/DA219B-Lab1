import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dishesRouter from './routes/dish.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Initialize express app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname + '/frontend')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/dishes', dishesRouter);

// Database connection
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log('Connected to database!');
    app.listen(PORT, () => {
    console.log("Server is running on port 5000");
    });
}).catch(() => console.log('Connection failed to database!'));
