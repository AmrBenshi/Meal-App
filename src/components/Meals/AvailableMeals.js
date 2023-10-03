import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(false)
  useEffect((
  ) => {
    const fetchMeals = async () => {
      const response = await fetch('https://meals-app-ab-default-rtdb.firebaseio.com/meals.json')
      if (!response.ok) {
        throw new Error('something went wrong!!!')
      }
      const data = await response.json()
      const loadedMeals = []
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }
    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])
  const mealsList = meals.map((meal) => (
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
        {isLoading && <p className={classes.loading} >Loading ... </p>}
        {httpError && <p className={classes.error}>{httpError}</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
