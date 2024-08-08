// /future-meals	Respond with all meals in the future (relative to the when datetime)
import express from "express";
import knex from "../database_client.js";
const futureMealsRouter = express.Router();

futureMealsRouter.get("/", async (request, response) => {
  try {
    const [meals] = await knex.raw(
      "select * from meal where `when` > '2024-08-06'"
    );
    if (meals.length > 0) {
      response.json(meals);
    } else {
      response.status(404).json({ Error: "No meals found for future date" });
    }
  } catch (error) {
    console.log("Error on fetching : " + error);
    response.status(500).json({ Error: "Server error" });
  }
});

export default futureMealsRouter;
