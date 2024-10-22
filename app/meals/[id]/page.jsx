"use client";
import {
  Typography,
  TextField,
  Box,
  Button,
  Modal,
  Rating,
  Chip,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import fetchMealById from "../../utils/fetchMealById";
import Meal from "../../components/Meal";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BookSeat from "../../components/BookSeat";
import SubmitReview from "../../components/SubmitReview";
import fetchCapacity from "../../utils/fetchCapacity";

const MealById = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [stars, setStars] = useState(0);
  const [spots, setSpots] = useState(null);

  useEffect(() => {
    const fetchMealCapacity = async () => {
      const result = await fetchCapacity(id);
      if (result > 0) {
        setSpots(result);
      } else {
        setSpots("No");
      }
    };
    fetchMealCapacity();
  }, [id]);

  useEffect(() => {
    if (id) {
      const getMeal = async () => {
        try {
          const fetchedMeal = await fetchMealById(id);
          setMeal(fetchedMeal);
          const reviewResponse = await fetch(
            `http://localhost:3001/api/reviews/${id}/reviews`
          );
          const review = await reviewResponse.json();
          if (review && review.average_star !== undefined) {
            setStars(review.average_star);
          } else {
            setStars(0);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getMeal();
    }
  }, [id]);

  if (!meal) {
    return <Typography>Loading meal details...</Typography>;
  }

  return (
    <>
      <Box
        sx={{
          marginTop: "100px",
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src="/bg3.jpg"
          alt=""
          sx={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            position: "absolute",
          }}
        />
        <Box
          sx={{
            position: "relative",
            top: "40%",
            left: "50%",
            width: "90%",
            maxWidth: "500px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "50vh",
              justifyContent: "center",
              marginTop: "5%",
            }}
          >
            <Meal
              id={meal.id}
              title={meal.title}
              description={meal.description}
              price={meal.price}
              image={meal.image_url}
            />
          </Box>
          <Box sx={{ marginTop: "60px", marginLeft: "40%" }}>
            <Rating
              value={stars}
              name="meal-sharing"
              icon={<StarIcon sx={{ color: "#ffeb3b" }} />}
              emptyIcon={<StarBorderIcon sx={{ color: "#ffeb3b" }} />}
              readOnly
            />
          </Box>
          <Box
            sx={{
              marginLeft: "25%",
              backgroundColor: "#deb887",
              borderRadius: "8px",
              textAlign: "center",
              padding: "10px",
              marginTop: "12px",
              maxWidth: "250px",
            }}
          >
            <Chip
              label={`${spots} spots available`}
              sx={{
                backgroundColor: "green",
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
                padding: "10px 15px",
              }}
            />
          </Box>
          <Box
            sx={{
              marginTop: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BookSeat id={id} />
            <SubmitReview id={id} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MealById;
