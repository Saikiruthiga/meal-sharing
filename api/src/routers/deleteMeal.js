import express from "express";
import knex from "../database_client.js";

const router = express.Router();

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const mealToDelete = await knex("meal").where({ id: id }).first();
    const deleteCount = await knex("meal").where({ id: id }).del();
    if (deleteCount === 0) {
      return response
        .status(404)
        .json({ Error: "No matching id found to delete the meal" });
    }
    response.json({ Message: "Meal successfully deleted", mealToDelete });
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

export default router;
