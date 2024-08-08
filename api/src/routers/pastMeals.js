// /past-meals	Respond with all meals in the past (relative to the when datetime)
import express from "express";
import knex from "../database_client.js";
const pastMealsRouter = express.Router();

pastMealsRouter.get("/", async (request, response) => {
  try {
    const [meals] = await knex.raw(
      "select * from meal where `when` < '2024-08-06'"
    );
    meals.length > 0
      ? response.json(meals)
      : response
          .status(404)
          .json({ Error: "No meals found before the given date" });
  } catch (error) {
    console.log("Error on fetching: " + error);
    response.status(500).json({ Error: "Server error" });
  }
});

export default pastMealsRouter;
