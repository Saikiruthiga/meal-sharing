"use client";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import { useState } from "react";
const Footer = () => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => {
    handleOpen();
    setValue("");
  };
  return (
    <>
      <Box sx={{ height: "150px", backgroundColor: "#212121" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            flexDirection: "column",
            marginLeft: "-45px",
            marginTop: "5px",
          }}
        >
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Join us at any time !
          </Typography>
          <Typography sx={{ color: "#bdbdbd" }}>
            Subscribe to our newsletter
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              id="filled-basic"
              label="Email"
              name="email"
              variant="filled"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                width: "200px",
                height: "40px",
                "& .MuiInputBase-input": {
                  padding: "10px 12px",
                  height: "2em",
                },
              }}
              value={value}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#03A9F4",
                color: "#fff",
                height: "40px",
                padding: "8px 16px",
              }}
              onClick={handleClick}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We appreciate your subscription!
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ mt: 2, display: "block", mx: "auto" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Footer;
