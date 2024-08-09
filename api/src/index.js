import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
//import nestedRouter from "./routers/nested.js";
import futureMealsRouter from "./routers/futureMeals.js";
import pastMealsRouter from "./routers/pastMeals.js";
import allMealsRouter from "./routers/allMeals.js";
import firstMealRouter from "./routers/firstMeal.js";
import lastMealRouter from "./routers/lastMeal.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

// This nested router example can also be replaced with your own sub-router
//router.use("/nested", nestedRouter);

apiRouter.use("/future-meals", futureMealsRouter);
apiRouter.use("/past-meals", pastMealsRouter);
apiRouter.use("/all-meals", allMealsRouter);
apiRouter.use("/first-meal", firstMealRouter);
apiRouter.use("/last-meal", lastMealRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
