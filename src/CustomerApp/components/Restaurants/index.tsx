import React from "react";
import { useQuery } from "react-query";
import { RestaurantReadDto } from "../../../models/Restaurant";
import { getRestaurants } from "../../../services/api/restaurant";
import Restaurant from "./RestaurantCard";
import classes from "./styles.module.scss";
import Products from "../Products";

export default function Restaurants() {
  const [restaurants, setRestaurants] = React.useState<RestaurantReadDto[]>([]);

  useQuery("restaurants", getRestaurants, {
    onSuccess: (response) => {
      setRestaurants(response);
    },
  });

  return (
    <div className={classes.wrapper}>
      <Products restaurantId="ddd30e64-b30e-4553-89a7-f2234cc9536d" />
      {restaurants.map((restaurant) => (
        <Restaurant key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
