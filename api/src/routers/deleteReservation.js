import express from "express";
import knex from "../database_client.js";
const router = express.Router();

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const ids = await knex("reservation").select("id");
    const idValues = ids.map((record) => String(record.id));
    if (!idValues.includes(String(id))) {
      return response
        .status(400)
        .json({ Error: `No matching id found to delete the reservation` });
    }
    await knex("reservation").where({ id: id }).del();
    response.json({ Message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

export default router;
