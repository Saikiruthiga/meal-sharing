const fetchMealByTitle = async (title) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/meals/meal-by-title/?title=${title}`
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(" Error on fetching : ", error);
    return [];
  }
};
export default fetchMealByTitle;
