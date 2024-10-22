const fetchCapacity = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/meals/meal-by-title/?availableReservations=true`
    );
    const data = await response.json();
    const meal = data.find((item) => Number(item.id) === Number(id));

    if (meal) {
      return meal.availableSpots;
    }
    return null;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export default fetchCapacity;
