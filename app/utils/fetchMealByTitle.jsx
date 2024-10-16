const fetchMealByTitle = async (title) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/meals/meal-by-title/?title=${title}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(" Error on fetching : ", error);
  }
};
export default fetchMealByTitle;
