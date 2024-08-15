import express from "express";
import knex from "../database_client.js";

const router = express.Router();

router.put("/:id", async (request, response) => {
  try {
    const reservationId = request.params.id;
    const data = request.body;
    if (String(reservationId) !== String(data.id)) {
      return response.status(400).json({
        Error: "Please provide the exact id to update the reservation",
      });
    }
    const ids = await knex("reservation").select("id"); //having array of objects
    const idValues = ids.map((record) => String(record.id));
    if (!idValues.includes(String(reservationId))) {
      return response
        .status(400)
        .json({ Error: "No matching id found to update the reservation" });
    }

    const number_of_guests = data.number_of_guests;
    const currentReservations = await knex("reservation")
      .sum("number_of_guests as total_guests")
      .where({ meal_id: data.meal_id })
      .first();
    const totalGuests = currentReservations.total_guests || 0;
    const meal = await knex("meal")
      .select("max_reservations")
      .where({ id: data.meal_id })
      .first();
    if (!meal) {
      return response.status(404).json({ Error: "Meal not found" });
    }
    const max_reservations = meal.max_reservations;
    if (number_of_guests + totalGuests > max_reservations) {
      const remainingCapacity = max_reservations - totalGuests;
      return response.status(400).json({
        Error: `Sorry, only ${remainingCapacity} seats are available for the meal`,
      });
    }
    await knex("reservation").update(data).where({ id: request.params.id });
    const updatedReservation = await knex("reservation")
      .where({ id: request.params.id })
      .first();
    response.json({ updatedReservation });
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

export default router;
