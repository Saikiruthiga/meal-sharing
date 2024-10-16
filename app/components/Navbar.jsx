"use client";
import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  CssBaseline,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

const DrawerAppBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const router = useRouter();
  const handleHome = () => {
    router.push("/home");
  };
  const handleMeals = () => {
    router.push("/meals");
  };
  const handleContact = () => {
    router.push("/contact");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleHome}>Home</ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleMeals}>Meals</ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleContact}>Contact</ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ height: "100px", backgroundColor: "#212121" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h2"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontFamily: "cursive",
              fontStyle: "italic",
            }}
          >
            Meal Sharing
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              sx={{ color: "#fff", mt: 2, display: "inline-block", mx: "auto" }}
              onClick={handleHome}
            >
              Home
            </Button>
            <Button
              sx={{ color: "#fff", mt: 2, display: "inline-block", mx: "auto" }}
              onClick={handleMeals}
            >
              Meals
            </Button>
            <Button
              sx={{ color: "#fff", mt: 2, display: "inline-block", mx: "auto" }}
              onClick={handleContact}
            >
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};
export default DrawerAppBar;
