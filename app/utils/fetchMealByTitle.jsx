const fetchMealByTitle = async (title) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/meals/meal-by-title/?title=${title}`
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
