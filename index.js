import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Dish from './models/dish.model.js';


const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dishes', error });
  }
});

app.get('/api/dishes/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const dish = await Dish.findOne({ name });
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dish', error });
  }
});

app.post('/api/dishes', async (req, res) => {
  const dish = req.body;
  try {
    const existingDish = await Dish.findOne({ name: dish.name });
    if (existingDish) {
      return res.status(409).json({ message: 'Dish already exists' });
    }

    const newDish = new Dish(dish);
    await newDish.save();
    
    res.status(201).json({ message: 'Dish created successfully', dish: newDish });
  } catch (error) {
    res.status(500).json({ message: 'Error creating dish', error });
  }
});

app.put('/api/dishes/:id', async (req, res) => {
  const { id } = req.params;
  const updatedDish = req.body;
  try {
    const dish = await Dish.findByIdAndUpdate(id, updatedDish, { new: true });
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish updated successfully', dish });
  } catch (error) {
    res.status(500).json({ message: 'Error updating dish', error });
  }
});

app.delete('/api/dishes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dish = await Dish.findByIdAndDelete(id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish deleted successfully', dish });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dish', error });
  }
});


mongoose.connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log('Connected to database!');
    app.listen(PORT, () => {
    console.log("Server is running on port 5000");
    });
}).catch(() => console.log('Connection failed to database!'));
