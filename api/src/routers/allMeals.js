// /all-meals	Respond with all meals sorted by ID
import knex from "../database_client.js";
import express from "express";
const allMealsRouter = express.Router();

allMealsRouter.get("/", async (request, response) => {
  try {
    const meals = await knex.raw("select * from meal order by id asc");
    response.json(meals[0]);
  } catch (error) {
    console.log("Error on fetching : " + error);
    response.status(500).json({ Error: "Server error" });
  }
});

export default allMealsRouter;