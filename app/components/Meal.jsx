import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Box,
  Link,
} from "@mui/material";

const Meal = ({ id, title, description, price, when, image }) => {
  return (
    <Box sx={{ marginTop: "50px" }}>
      <Card sx={{ maxWidth: 345, mb: 2, bgcolor: "#1F1F1F" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#FF6F61" }} aria-label="recipe">
              {title[0].toUpperCase()}
            </Avatar>
          }
          title={
            <Typography variant="h6" color="white">
              {title}
            </Typography>
          }
        />
        <CardMedia component="img" height="194" image={image} alt={title} />
        <CardContent>
          <Typography variant="body2" sx={{ color: "#B0BEC5" }}>
            {description}
          </Typography>
          <Typography variant="h6" sx={{ color: "#FFC107", mt: 1 }}>
            {price} kr
          </Typography>
          <Link href={`/meals/${id}`}>
            <Typography
              sx={{
                cursor: "pointer",
                color: "#00BCD4",
                textDecoration: "underline",
              }}
            >
              View
            </Typography>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Meal;
