const fetchMeals = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/meals/all-meals`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default fetchMeals;
