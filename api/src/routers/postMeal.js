import express from "express";
import knex from "../database_client.js";

const router = express.Router();
router.post("/", async (request, response) => {
  try {
    const data = request.body;
    if (Object.values(data).length === 0) {
      return response
        .status(404)
        .json({ Error: "Please provide the meal details to create" });
    }
    const [newMealId] = await knex("meal").insert(data);
    const newMeal = await knex("meal").where({ id: newMealId }).first();
    response.status(201).json({ newMeal });
  } catch (error) {
    console.log("Error on creating new record : " + error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

export default router;
