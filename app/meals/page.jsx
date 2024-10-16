"use client";
import { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import fetchMeals from "../utils/fetchMeals";
import MealGrid from "../components/MealGrid";
import sortMeals from "../utils/sortMeals";
import SortingButtons from "../components/SortingButtons";

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [sortDir, setSortDir] = useState("");
  useEffect(() => {
    const getMeals = async () => {
      let fetchedMeals;
      if (sortKey && sortDir) {
        fetchedMeals = await sortMeals(sortKey, sortDir);
      } else {
        fetchedMeals = await fetchMeals();
      }
      setMeals(fetchedMeals);
    };
    getMeals();
  }, [sortKey, sortDir]);
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          position: "relative",
          marginTop: "100px",
          backgroundImage: "url(/bg_meal.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
          <SortingButtons
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortDir={sortDir}
            setSortDir={setSortDir}
          />
          <MealGrid meals={meals} />
        </Container>
      </Box>
    </>
  );
};
export default MealList;
