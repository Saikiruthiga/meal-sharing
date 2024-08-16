import "dotenv/config";
import express from "express";

import allMealsRouter from "./allMeals.js";
import postMealRouter from "./postMeal.js";
import getMealRouter from "./getMealById.js";
import updateMealRouter from "./updateMeal.js";
import deleteMealRouter from "./deleteMeal.js";

const app = express();
app.use(express.json());

const apiRouter = express.Router();
app.use(apiRouter);
apiRouter.use("/api/meals", allMealsRouter);
apiRouter.use("/api/meals", postMealRouter);
apiRouter.use("/api/meals", getMealRouter);
apiRouter.use("/api/meals", updateMealRouter);
apiRouter.use("/api/meals", deleteMealRouter);

app.listen(3000, () => console.log("Server is listening on port 3000...."));
