import express from "express";
import knex from "../database_client.js";

const mealByIdRouter = express.Router();

mealByIdRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const getMeal = await knex("meal").where("id", id).first();
    if (!getMeal) {
      return response.status(404).json({ Error: "No records found" });
    }
    response.json({ getMeal });
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

export default mealByIdRouter;
