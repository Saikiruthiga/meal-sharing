"use client";
import { Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import fetchMeals from "../utils/fetchMeals";
import MealGrid from "./MealGrid";
import { useRouter } from "next/navigation";
import Footer from "./Footbar";
import fetchMealByTitle from "../utils/fetchMealByTitle";

const MainPage = () => {
  const [meals, setMeals] = useState([]);
  const [searchMeal, setSearchMeal] = useState("");
  const handleChange = (e) => {
    setSearchMeal(e.target.value);
  };
  const router = useRouter();
  useEffect(() => {
    const getMeals = async () => {
      if (searchMeal) {
        const fetchedMeals = await fetchMealByTitle(searchMeal);
        setMeals(fetchedMeals);
      } else {
        const fetchedMeals = await fetchMeals();
        setMeals(fetchedMeals.slice(0, 3));
      }
    };
    getMeals();
  }, [searchMeal]);
  const handleClick = () => {
    router.push("/meals");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box
        sx={{
          marginTop: "100px",
          width: "100vw",
          height: "60vh",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src="bg1.jpg"
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "40%",
            width: "90%",
            maxWidth: "500px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search meal"
            sx={{
              backgroundColor: "whitesmoke",
              borderRadius: "5px",
              boxShadow: 2,
            }}
            value={searchMeal}
            onChange={handleChange}
          />
        </Box>
      </Box>

      <Container sx={{ flex: 1 }}>
        <MealGrid meals={meals} />
        <Box sx={{ display: "flex", mt: 2, marginLeft: "41%" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", mb: "50px" }}
            onClick={handleClick}
          >
            See more
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
export default MainPage;