"use client";
import { Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import fetchMeals from "../utils/fetchMeals";
import MealGrid from "../components/MealGrid";
import { useRouter } from "next/navigation";
import Footer from "../components/Footbar";
import fetchMealByTitle from "../utils/fetchMealByTitle";

const MainPage = () => {
  const [meals, setMeals] = useState(() => {
    if (typeof window !== "undefined") {
      const storedMeals = localStorage.getItem("meals");
      return storedMeals ? JSON.parse(storedMeals) : [];
    }
    return [];
  });
  const [searchMeal, setSearchMeal] = useState("");

  const handleChange = (e) => {
    setSearchMeal(e.target.value);
  };
  const router = useRouter();
  useEffect(() => {
    const getMeals = async () => {
      if (searchMeal) {
        const fetchedMeal = await fetchMealByTitle(searchMeal);
        setMeals(fetchedMeal);
      } else {
        if (meals.length === 0) {
          try {
            const fetchedMeals = await fetchMeals();
            const slicedMeals = fetchedMeals.slice(0, 3);
            setMeals(slicedMeals);
            if (typeof window !== "undefined") {
              localStorage.setItem("meals", JSON.stringify(slicedMeals));
            }
          } catch (error) {
            console.error("Error fetching meals:", error);
          }
        }
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
