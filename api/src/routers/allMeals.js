// /all-meals	Respond with all meals sorted by ID
import knex from "../database_client.js";
import express from "express";
const allMealsRouter = express.Router();

allMealsRouter.get("/", async (request, response) => {
  try {
    const meals = await knex("meal").select("*");
    response.json(meals);
  } catch (error) {
    console.log("Error on fetching : " + error);
    response.status(500).json({ Error: "Server error" });
  }
});

export default allMealsRouter;
