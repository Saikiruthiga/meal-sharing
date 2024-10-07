import "dotenv/config";
import express from "express";
import cors from "cors";

import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouters from "./routers/meals&reviews/reviewsRouters.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/meals", mealsRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/reviews", reviewsRouters);

app.listen(process.env.PORT || 3000, () => {
  console.log(`API is listening on port ${process.env.PORT || 3000}`);
});
