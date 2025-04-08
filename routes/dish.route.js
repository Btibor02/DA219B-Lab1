import express from 'express';
import dishController from '../controllers/dish.controller.js';

const router = express.Router();

router.get('/', dishController.getDishes);

router.get('/:name', dishController.getDishByName);
  
router.post('/', dishController.postDish);
  
router.put('/:id', dishController.putDish);
  
router.delete('/:id', dishController.deleteDish);

export default router;