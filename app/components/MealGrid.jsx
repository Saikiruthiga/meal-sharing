import { Box, Grid2, Typography } from "@mui/material";
import Meal from "./Meal";

const MealGrid = ({ meals }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ margin: "15px" }}>
        Meals
      </Typography>
      <Grid2 container spacing={2}>
        {meals.map((meal) => {
          return (
            <Grid2 key={meal.id}>
              <Meal
                id={meal.id}
                title={meal.title}
                description={meal.description}
                price={meal.price}
                image={meal.image_url}
              />
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};

export default MealGrid;
