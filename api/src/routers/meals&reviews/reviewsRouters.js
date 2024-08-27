import "dotenv/config";
import express from "express";
import knex from "../../database_client.js";

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

// /api/reviews	GET	Returns all reviews.

app.get("/api/reviews", async (request, response) => {
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

app.get("/api/meals/:meal_id/reviews", async (request, response) => {
  try {
    const { meal_id } = request.params;
    const data = await knex("review").select("*").where({ meal_id: meal_id });
    if (data.length > 0) {
      return response.json(data);
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

app.post("/api/reviews", async (request, response) => {
  try {
    const data = request.body;
    if (!data.meal_id || !data.title || !data.stars) {
      return response.status(400).json({
        Error: "Invalid request, provide meal_id,title and stars for reviews",
      });
    } else {
      const [insertedId] = await knex("review").insert(data);
      const review = await knex("review").select("*").where({ id: insertedId });
      response.json({ "Inserted record": review });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ Error: "Internal server error" });
  }
});

// /api/reviews/:id	GET	Returns a review by id.

app.get("/api/reviews/:id", async (request, response) => {
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

app.put("/api/reviews/:id", async (request, response) => {
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

app.delete("/api/reviews/:id", async (request, response) => {
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

app.listen(port, () => console.log("Server is listening on port 5000...."));
