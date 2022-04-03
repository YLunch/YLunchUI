import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Login from "../Login";
import Products from "../Products";
import Registration from "../Registration";
import Restaurants from "../Restaurants";

export default function Body() {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route
          path="restaurants/:restaurantId/products"
          element={<Products />}
        />
        <Route path="restaurants" element={<Restaurants />} />
      </Routes>
    </Container>
  );
}
