import "dotenv/config";
import express from "express";
import knex from "../../database_client.js";

const app = express();
app.use(express.json());

const router = express.Router();
app.use("/api/meals", router);

router.get("/", async (request, response) => {
  const {
    maxPrice,
    availableReservations,
    title,
    dateAfter,
    dateBefore,
    limit,
    sortKey,
    sortDir,
  } = request.query;
  try {
    let query = knex("meal").select("*");
    if (maxPrice) {
      if (!isNaN(maxPrice)) {
        query = query.where("price", "<", parseFloat(maxPrice));
      } else {
        return response.status(400).json({ Error: "Invalid price value" });
      }
    }
    const checkDateFormat = (date) => {
      const regEx = /^\d{4}-\d{2}-\d{2}$/;
      if (!date.match(regEx)) {
        return response
          .status(400)
          .json({ Error: "Invalid date format. Use 'YYYY-MM-DD' format" });
      }
    };

    if (dateAfter) {
      checkDateFormat(dateAfter);
      query = query.where("when", ">", dateAfter);
    }
    if (title) {
      query = query.where("title", "like", `%${title}%`);
    }
    if (dateBefore) {
      checkDateFormat(dateBefore);
      query = query.where("when", "<", dateBefore);
    }
    if (limit) {
      if (!isNaN(limit)) {
        query = query.limit(parseInt(limit));
      } else {
        return response.status(400).json({ Error: "Invalid limit value" });
      }
    }
    if (sortKey) {
      if (
        sortKey !== "when" &&
        sortKey !== "price" &&
        sortKey !== "max_reservations"
      ) {
        return response.status(400).json({
          Error:
            "Invalid sortKey, use 'when' or'price' or 'max_reservations' as sortKey value",
        });
      }
      let sortDirection = "asc";
      if (sortDir) {
        if (sortDir !== "asc" && sortDir !== "desc") {
          return response
            .status(400)
            .json({ Error: "Please provide 'asc' or 'desc' as sortDir value" });
        }
        sortDirection = sortDir;
      }
      query = query.orderBy(sortKey, sortDirection);
    }
    let meals = await query;

    if (availableReservations) {
      const reservedMeals = await knex("reservation")
        .select("meal_id")
        .sum("number_of_guests as total_guests")
        .groupBy("meal_id");
      meals = meals.map((meal) => {
        const reservation = reservedMeals.find(
          (res) => res.meal_id === meal.id
        );
        let availableSpots;
        if (reservation) {
          availableSpots = meal.max_reservations - reservation.total_guests;
        } else {
          availableSpots = meal.max_reservations;
        }
        return { ...meal, availableSpots };
      });
      if (availableReservations === "true") {
        meals = meals.filter((meal) => meal.availableSpots > 0);
      } else if (availableReservations === "false") {
        meals = meals.filter((meal) => meal.availableSpots === 0);
      } else {
        return response.status(400).json({
          Error: "Invalid availableReservations value. use 'true' or 'false'",
        });
      }
    }

    if (meals.length > 0) {
      return response.json(meals);
    }
    return response.status(404).json("No meals found with the given condition");
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

app.listen(3000, () => console.log("Server is listening on port 3000...."));
