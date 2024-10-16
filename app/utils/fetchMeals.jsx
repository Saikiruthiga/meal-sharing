const fetchMeals = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/meals/all-meals");
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default fetchMeals;
