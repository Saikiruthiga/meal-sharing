import "dotenv/config";
import express from "express";
import knex from "../../database_client.js";

const app = express();
app.use(express.json());

//const port = process.env.PORT || 5000;

// /api/reviews	GET	Returns all reviews.

const reviewsRouters = express.Router();

reviewsRouters.get("/all-reviews", async (request, response) => {
  try {
    const reviews = await knex("review").select("*");
    if (reviews.length > 0) {
      return response.json(reviews);
    }
    return response.status(404).json("No records found");
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

// /api/meals/:meal_id/reviews	GET	Returns all reviews for a specific meal.

reviewsRouters.get("/:meal_id/reviews", async (request, response) => {
  try {
    const { meal_id } = request.params;
    const data = await knex("review").select("*").where({ meal_id: meal_id });
    const averageStars = await knex("review")
      .where({ meal_id: meal_id })
      .avg("stars as average_star")
      .first();
    if (data.length > 0) {
      return response.json(averageStars);
    }
    return response
      .status(404)
      .json({ Error: `No reviews found for the given meal_id ${meal_id}` });
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

// /api/reviews	POST	Adds a new review to the database

reviewsRouters.post("/post", async (request, response) => {
  try {
    const data = request.body;
    console.log("Received Data :" + JSON.stringify(data));
    if (!data.meal_id || !data.title || !data.stars) {
      return response.status(400).json({
        Error: "Invalid request, provide meal_id,title and stars for reviews",
      });
    } else {
      console.log("Data to be inserted:", data);
      const [insertedId] = await knex("review").insert(data);
      const review = await knex("review").select("*").where({ id: insertedId });
      response.json({ "Inserted record": review });
    }
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ Error: error.sqlMessage || "Internal server error" });
  }
});

// /api/reviews/:id	GET	Returns a review by id.

reviewsRouters.get("/api/reviews/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const review = await knex("review").select("*").where({ id: id });
    if (review.length > 0) {
      return response.json(review);
    }
    return response
      .status(404)
      .json({ Error: "No record found for the given id" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

// /api/reviews/:id	PUT	Updates the review by id.

reviewsRouters.put("/api/reviews/:id", async (request, response) => {
  const { id } = request.params;
  const { title, description, meal_id, stars } = request.body;
  const existingReview = await knex("review")
    .select("*")
    .where({ id: id })
    .first();
  if (!existingReview) {
    return response
      .status(404)
      .json({ Error: `No record found for the given id ${id}` });
  }
  await knex("review")
    .update({ title, description, meal_id, stars })
    .where({ id: id });
  const updatedRecord = await knex("review").select("*").where({ id }).first();
  response.json({ updatedRecord: updatedRecord });
});

// /api/reviews/:id	DELETE	Deletes the review by id.

reviewsRouters.delete("/api/reviews/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const reviewToDelete = await knex("review").where({ id }).first();

    if (!reviewToDelete) {
      return response
        .status(404)
        .json({ Error: `No record found fro the given id ${id} ` });
    }
    await knex("review").where({ id }).del();
    response.json({ Message: `The record with id ${id} has been deleted` });
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

export default reviewsRouters;

//app.listen(port, () => console.log("Server is listening on port 5000...."));
