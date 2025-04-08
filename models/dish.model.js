import mongoose from "mongoose";

// This is a Mongoose schema for a Dish model
const DishSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Dish name is required"]
    },

    ingredients: [{
        type: String,
        required: [true, "Ingredients are required"]
    }],

    preparationSteps: [{
        type: String,
        required: [true, "Steps are required"]
    }],

    cookingTime: {
        type: Number,
        required: [true, "Cooking time is required"],
        default: 0
    },

    origin: String,
    servings: Number
});

const Dish = mongoose.model("dish", DishSchema);
export default Dish;