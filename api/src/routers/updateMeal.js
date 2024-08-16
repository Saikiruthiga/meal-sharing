import express from "express";
import knex from "../database_client.js";

const router = express.Router();

router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const data = request.body;
    if (String(id) !== String(data.id)) {
      return response
        .status(400)
        .json({ Error: "Please provide the exact id to update the meal" });
    }
    const updateCount = await knex("meal").where({ id: id }).update(data);
    if (updateCount === 0) {
      return response
        .status(404)
        .json({ Error: "No matching record id found to update the details" });
    }
    const updatedMeal = await knex("meal").where({ id: id }).first();
    response.json({
      Message: "Updated Successfully",
      updatedMeal: updatedMeal,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

export default router;
