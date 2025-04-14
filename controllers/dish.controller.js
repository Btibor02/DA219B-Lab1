import Dish from '../models/dish.model.js';

// Get all dishes
// @route GET /api/dishes
const getDishes = async (req, res) => {
  try {
      const dishes = await Dish.find();
      res.status(200).json(dishes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dishes', error });
    }
  };


// Get dish by name
// @route GET /api/dishes/:name
const getDishByName = async (req, res) => {
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
      };

const getDishByOrigin = async (req, res) => {
  const { origin } = req.params;
      try {
        const dish = await Dish.findOne({ origin });
        if (!dish) {
          return res.status(404).json({ message: 'Dish not found' });
        }
        res.status(200).json(dish);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching dish', error });
      }
    };

// Create a new dish
// @route POST /api/dishes
const postDish = async (req, res) => {
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
      };

// Update a dish
// @route PUT /api/dishes/:id
const putDish = async (req, res) => {
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
      };

// Delete a dish
// @route DELETE /api/dishes/:id
const deleteDish = async (req, res) => {
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
      };

export default {
    getDishes, getDishByName, postDish, putDish, deleteDish, getDishByOrigin
};