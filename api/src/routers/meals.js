import express from "express";
import futureMealsRouter from "./futureMeals.js";
import pastMealsRouter from "./pastMeals.js";
import allMealsRouter from "./allMeals.js";
import firstMealRouter from "./firstMeal.js";
import lastMealRouter from "./lastMeal.js";
import mealByIdRouter from "./getMealById.js";
import mealByTitleRouter from "./meals&reviews/queryParams.js";

const router = express.Router();

router.use("/future-meals", futureMealsRouter);
router.use("/past-meals", pastMealsRouter);
router.use("/all-meals", allMealsRouter);
router.use("/first-meal", firstMealRouter);
router.use("/last-meal", lastMealRouter);
router.use("/meal-by-id", mealByIdRouter);
router.use("/meal-by-title", mealByTitleRouter);

export default router;
