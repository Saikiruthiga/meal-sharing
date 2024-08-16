import express from "express";
import knex from "../database_client.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const data = request.body;
    if (
      !data.number_of_guests ||
      !data.meal_id ||
      !data.contact_name ||
      !data.contact_phonenumber
    ) {
      return response.status(400).json({
        Error: "Please provide the all necessary reservation details",
      });
    }
    const { meal_id, number_of_guests } = request.body;
    const meal = await knex("meal")
      .select("max_reservations")
      .where({ id: meal_id })
      .first();
    if (!meal) {
      return response.status(404).json({ Error: "No meal found" });
    }
    const currentReservations = await knex("reservation")
      .sum("number_of_guests as total_guests")
      .where({ meal_id: meal_id })
      .first();

    const numberOfGuests = currentReservations.total_guests || 0;
    if (Number(numberOfGuests) + number_of_guests > meal.max_reservations) {
      const remainingCapacity = meal.max_reservations - numberOfGuests;
      return response.status(404).json({
        Error: `Sorry, The capacity is only for ${remainingCapacity} more people`,
      });
    }
    const [newId] = await knex("reservation").insert(data);
    const newReservation = await knex("reservation")
      .where({ id: newId })
      .first();
    response.status(201).json({ newReservation });
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

export default router;
