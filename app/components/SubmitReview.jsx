import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  Rating,
} from "@mui/material";

const SubmitReview = ({ id }) => {
  const [form, setForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stars: "",
    meal_id: id,
  });
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState({ message: "", type: "" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm(false);
    setFormData("");
  };
  const clearFormState = () => {
    setFormData({
      title: "",
      description: "",
      stars: "",
      meal_id: "",
    });
  };

  const handleReview = () => {
    setForm(true);
  };
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const postReview = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          const result = await response.json();
          setModal({
            message: "Review submitted successfully",
            type: "Success",
          });
        } else {
          const errorResult = await response.json();
          console.log(errorResult);
          setModal({ message: "Failed to submit the review", type: "Error" });
        }
        setOpen(true);
      } catch (error) {
        console.log(error);
        setModal({ message: "An error occured", type: "Error" });
        setOpen(true);
      }
    };
    postReview();
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{ margin: "5px", backgroundColor: "#03A9F4", color: "white" }}
        onClick={handleReview}
      >
        Submit Review
      </Button>
      {form && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            marginTop: "65px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e3f2fd",
            padding: "20px",
            borderRadius: "10px",
            position: "absolute",
            top: "32%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="filled-basic"
            label="Title"
            variant="filled"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          />
          <TextField
            id="filled-basic"
            label="Description"
            variant="filled"
            name="description"
            value={formData.description}
            onChange={handleChange}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          />
          <Rating
            name="stars"
            value={formData.stars}
            onChange={(event, newValue) => {
              handleChange({
                target: {
                  name: "stars",
                  value: newValue,
                },
              });
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              padding: "15px",
              fontSize: "1rem",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#4CAF50", color: "#ffffff" }}
            onClick={handleOpen}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "#f44336", borderColor: "#f44336" }}
            onClick={() => {
              setForm(false);
              clearFormState();
            }}
          >
            Close
          </Button>
        </Box>
      )}
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
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            zIndex: 1300,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modal.type}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modal.message}
          </Typography>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};
export default SubmitReview;
