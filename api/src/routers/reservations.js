import "dotenv/config";
import express from "express";
import allReservationsRouter from "./allReservation.js";
import postReservationRouter from "./postReservation.js";
import getReservationByIdRouter from "./getReservationById.js";
import updateReservationRouter from "./updateReservation.js";
import deleteReservationRouter from "./deleteReservation.js";

const app = express();

app.use(express.json());

const apiRouter = express.Router();
app.use(apiRouter);
apiRouter.use("/api/reservations", allReservationsRouter);
apiRouter.use("/api/reservations", postReservationRouter);
apiRouter.use("/api/reservations", getReservationByIdRouter);
apiRouter.use("/api/reservations", updateReservationRouter);
apiRouter.use("/api/reservations", deleteReservationRouter);

app.listen(3000, () => console.log("server is listening on port 3000...."));
