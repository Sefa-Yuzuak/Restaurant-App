import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sish Kebap",
    description: "Turkish traditional meat",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Lahmacun",
    description: "Meat, thin dough",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Humus",
    description: "Turkish delicious food!",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];
// Dummy Meals its pretend to database in this demo application

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
