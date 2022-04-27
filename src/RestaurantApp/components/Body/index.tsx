import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AddRestaurant from "../AddRestaurant";

export default function Body() {
  return (
    <Container disableGutters sx={{ display: "flex", flexDirection: "column" }}>
      <Routes>
        <Route path="addRestaurant" element={<AddRestaurant />} />
      </Routes>
    </Container>
  );
}
