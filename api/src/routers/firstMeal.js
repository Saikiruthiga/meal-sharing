// /first-meal	Respond with the first meal (meaning with the minimum id)

import knex from "../database_client.js";
import express from "express";

const firstMealRouter = express.Router();

firstMealRouter.get("/", async (request, response) => {
  try {
    const [meal] = await knex.raw("select * from meal order by id limit 1");
    if (meal.length > 0) {
      response.json(meal[0]);
    } else {
      response.status(404).json({ Error: "No records found" });
    }
  } catch (error) {
    response.status(500).json({ Error: "Server error" });
    console.log("Error on fetching : " + error);
  }
});

export default firstMealRouter;
