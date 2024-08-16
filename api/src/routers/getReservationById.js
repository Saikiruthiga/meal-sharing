import express from "express";
import knex from "../database_client.js";
const router = express.Router();

router.get("/:id", async (request, response) => {
  try {
    const reservationId = request.params.id;
    const reservation = await knex("reservation")
      .where({ id: reservationId })
      .first();
    if (!reservation) {
      return response
        .status(404)
        .json({
          Error: `No matching reservation found for this id ${reservationId}`,
        });
    }
    response.json({ reservation });
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

export default router;
