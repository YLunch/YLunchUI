import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AddRestaurant from "../AddRestaurant";
import CreateProductForm from "../CreateProduct/CreateProduct";

export default function Body() {
  return (
    <Container disableGutters sx={{ display: "flex", flexDirection: "column" }}>
      <Routes>
          <Route path="addRestaurant" element={<AddRestaurant />} />
          <Route path="createProduct" element={<CreateProductForm />} />
      </Routes>
    </Container>
  );
}
