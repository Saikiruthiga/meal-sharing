import { useState, useEffect, useRef } from "react";
import { Modal, Button, Box, Typography, TextField } from "@mui/material";
import fetchCapacity from "../utils/fetchCapacity";

const BookSeat = ({ id }) => {
  const [form, setForm] = useState(false);
  const [open, setOpen] = useState(false);

  const [modal, setModal] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_phonenumber: "",
    contact_email: "",
    number_of_guests: "",
    meal_id: id,
  });
  const handleClose = () => {
    setOpen(false);
    setForm(false);
    clearFormState();
  };
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const [errors, setErrors] = useState({
    contact_name: "",
    contact_phonenumber: "",
    contact_email: "",
    number_of_guests: "",
  });
  const [capacity, setCapacity] = useState(false);

  useEffect(() => {
    const checkCapacity = async () => {
      const result = await fetchCapacity(id);
      if (result > 0) setCapacity(true);
    };
    checkCapacity();
  }, [id]);

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    if (!formData.contact_name) {
      formErrors.contact_name = "Name is required";
      isValid = false;
    }

    const phRegex = /^[0-9]{8}$/;
    if (!phRegex.test(formData.contact_phonenumber)) {
      formErrors.contact_phonenumber = "invalid phone number";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contact_email)) {
      formErrors.contact_email = "invalid email address";
      isValid = false;
    }

    if (!formData.number_of_guests) {
      formErrors.number_of_guests = "Number of guests is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    else {
      const postData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/reservations/post`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          if (response.ok) {
            const result = await response.json();
            setModal({
              message: "Seats reserved successfully",
              type: "Success",
            });
          } else {
            const errorResponse = await response.text();
            setModal({ message: "Failed to reserve", type: "Error" });
          }
          setOpen(true);
        } catch (error) {
          console.log(error);
          setModal({ message: "An error occured", type: "Error" });
          setOpen(true);
        }
      };
      postData();
    }
  };

  const clearFormState = () => {
    setFormData({
      contact_name: "",
      contact_phonenumber: "",
      contact_email: "",
      number_of_guests: "",
      meal_id: id,
    });
    setErrors({
      contact_name: "",
      contact_phonenumber: "",
      contact_email: "",
      number_of_guests: "",
    });
  };

  const handleClick = (e) => {
    if (capacity) {
      clearFormState();
      setForm(true);
    } else {
      return;
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{ margin: "5px", backgroundColor: "#4CAF50", color: "white" }}
        onClick={handleClick}
      >
        {capacity > 0 ? "Book seat" : "Fully Booked"}
      </Button>
      {form && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            marginTop: "68px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e3f2fd",
            padding: "20px",
            borderRadius: "10px",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            error={!!errors.contact_name}
            helperText={errors.contact_name}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          />
          <TextField
            id="filled-basic"
            label="Ph number"
            variant="filled"
            name="contact_phonenumber"
            value={formData.contact_phonenumber}
            onChange={handleChange}
            error={!!errors.contact_phonenumber}
            helperText={errors.contact_phonenumber}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          />
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            error={!!errors.contact_email}
            helperText={errors.contact_email}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          />
          <TextField
            id="filled-basic"
            label="No of guests"
            variant="filled"
            name="number_of_guests"
            value={formData.number_of_guests}
            onChange={handleChange}
            error={!!errors.number_of_guests}
            helperText={errors.number_of_guests}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#4CAF50" }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "#f44336", borderColor: "#f44336" }}
            onClick={() => setForm(false)}
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
            outline: "none",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modal.type}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modal.message}
          </Typography>
          <Button
            onClick={handleClose}
            sx={{ mt: 2, display: "block", mx: "auto" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BookSeat;
