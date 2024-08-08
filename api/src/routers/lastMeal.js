// /last-meal	Respond with the last meal (meaning with the maximum id)
import knex from "../database_client.js";
import express from "express";

const lastMealRouter = express.Router();

lastMealRouter.get("/", async (request, response) => {
  try {
    const [meal] = await knex.raw(
      "select * from meal order by id desc limit 1"
    );
    meal.length > 0
      ? response.json(meal[0])
      : response.status(404).json({ Error: "No records found" });
  } catch (error) {
    console.log("Error on fetching : " + error);
    response.status(500).json({ Error: "Server error" });
  }
});

export default lastMealRouter;
