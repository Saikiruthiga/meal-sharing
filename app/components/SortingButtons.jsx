import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";

const SortingButtons = ({ sortKey, setSortKey, sortDir, setSortDir }) => {
  const handleChange = (e) => {
    setSortKey(e.target.value);
  };
  const handleChangeDir = (e) => {
    setSortDir(e.target.value);
  };
  return (
    <Container sx={{ marginLeft: "80%", marginTop: "5%" }}>
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          backgroundColor: "#D2B48C",
          color: "#000",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#8B4513",
            },
            "&:hover fieldset": {},
            "&.Mui-focused fieldset": {
              borderColor: "#8B4513",
            },
          },
        }}
        size="small"
      >
        <InputLabel id="demo-select-small-label">Sort on</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={sortKey}
          label="sortKey"
          onChange={handleChange}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="max_reservations">Max_Reservations</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          backgroundColor: "#D2B48C",
          color: "#000",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#8B4513",
            },
            "&:hover fieldset": {
              borderColor: "#A0522D",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#8B4513",
            },
          },
        }}
        size="small"
      >
        <InputLabel id="demo-select-small-label">Sort Order</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={sortDir}
          label="sortDir"
          onChange={handleChangeDir}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
};
export default SortingButtons;
