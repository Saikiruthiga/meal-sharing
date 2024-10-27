const fetchCapacity = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/meals/meal-by-title/?availableReservations=true`
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
