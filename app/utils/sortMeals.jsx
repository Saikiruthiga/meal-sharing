const sortMeals = async (sortKey, sortDir) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/meals/meal-by-title/?sortKey=${sortKey}&sortDir=${sortDir}`
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error on sorting :", error);
  }
};
export default sortMeals;
