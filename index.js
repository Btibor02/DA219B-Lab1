import express from 'express';
import mongoose from 'mongoose';
import Dish from './models/dish.model.js'; // Adjust the path as necessary


const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

app.get('/', (req, res) => {
  res.send('Hello World Test')
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

mongoose.connect('mongodb+srv://Cluster12032:Frontend1@cluster0.8rrzzin.mongodb.net/lab?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to database!');
    // Ezt átrakni majd .env-be
    app.listen(5000, () => {
    console.log("Server is running on port 5000");
    });
}).catch(() => console.log('Connection failed to database!'));
