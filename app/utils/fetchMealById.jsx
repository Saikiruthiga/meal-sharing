const fetchMealById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/meals/meal-by-id/${id}`
    );
    const result = await response.json();
    return result.getMeal;
  } catch (error) {
    console.log("Error on fetching :", error);
  }
};
export default fetchMealById;
