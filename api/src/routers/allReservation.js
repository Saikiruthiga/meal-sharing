import express from "express";
import knex from "../database_client.js";

const allReservationsRouter = express.Router();

allReservationsRouter.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservation").select();
    if (reservations.length === 0) {
      return response.status(404).json({ Error: "No records found" });
    }
    response.json(reservations);
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

export default allReservationsRouter;
