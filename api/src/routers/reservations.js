import express from "express";
import allReservationsRouter from "./allReservation.js";
import postReservationRouter from "./postReservation.js";
import getReservationByIdRouter from "./getReservationById.js";
import updateReservationRouter from "./updateReservation.js";
import deleteReservationRouter from "./deleteReservation.js";

const router = express.Router();

router.use("/all-reservations", allReservationsRouter);
router.use("/post", postReservationRouter);
router.use("/get-by-id", getReservationByIdRouter);
router.use("/", updateReservationRouter);
router.use("/", deleteReservationRouter);

export default router;
