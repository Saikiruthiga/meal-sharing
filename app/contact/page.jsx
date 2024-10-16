"use client";
import Footer from "../components/Footbar";
import { Box, Typography, Button, TextField, Modal } from "@mui/material";
import { useState } from "react";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOpen();
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#D2B48C",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        component="form"
        sx={{
          marginTop: "10%",
          marginBottom: "7%",
          maxWidth: 600,
          marginLeft: "35%",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 3,
          backgroundImage: "linear-gradient(135deg, #f0f0f0 30%, #d0d0d0 100%)",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={4}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
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
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thank you!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We will revert you within 2 business days!
          </Typography>
          <Button
            onClick={handleClose}
            sx={{ mt: 1, display: "block", mx: "0 auto" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Footer sx={{ marginTop: "auto", width: "100%" }} />
    </Box>
  );
};
export default Contact;
