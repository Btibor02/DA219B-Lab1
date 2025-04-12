import express from 'express';
import dishController from '../controllers/dish.controller.js';

const router = express.Router();

// Define routes for dish-related operations

// GET /dishes - Get all dishes
router.get('/', dishController.getDishes);

// GET /dishes/:name - Get a dish by name
router.get('/:name', dishController.getDishByName);

// POST /dishes - Create a new dish
router.post('/', dishController.postDish);

// PUT /dishes/:id - Update a dish by ID
router.put('/:id', dishController.putDish);

// DELETE /dishes/:id - Delete a dish by ID
router.delete('/:id', dishController.deleteDish);

export default router;