const fetchMealById = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/meals/meal-by-id/${id}`
    );
    const result = await response.json();
    return result.getMeal;
  } catch (error) {
    console.log("Error on fetching :", error);
  }
};
export default fetchMealById;
