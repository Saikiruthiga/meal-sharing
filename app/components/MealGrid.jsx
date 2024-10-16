import { Container, Box, Grid2, Typography } from "@mui/material";
import Meal from "./Meal";

const MealGrid = ({ meals }) => {
  const images = [
    { name: "Smorbrod", url: "/smorbrod.jpg" },
    { name: "Paella", url: "/paella.jpg" },
    { name: "Sushi", url: "/sushi.jpg" },
    { name: "Hamburger", url: "/hamburger.jpg" },
    { name: "Pad Thai", url: "/pad_thai.jpg" },
    { name: "Tagine", url: "/tagine.jpg" },
    { name: "Biryani", url: "/biryani.jpg" },
    { name: "Ceviche", url: "/ceviche.jpg" },
    { name: "Pasta Carbonara", url: "/pasta.jpg" },
  ];
  return (
    <Box>
      <Typography variant="h4" sx={{ margin: "15px" }}>
        Meals
      </Typography>
      <Grid2 container spacing={2}>
        {meals.map((meal) => {
          const mealImage = images.find((img) => img.name === meal.title);
          return (
            <Grid2 key={meal.id}>
              <Meal
                id={meal.id}
                title={meal.title}
                description={meal.description}
                price={meal.price}
                when={meal.when}
                image={mealImage.url}
              />
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};

export default MealGrid;
