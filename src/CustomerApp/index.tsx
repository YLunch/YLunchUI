import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Restaurants from "./components/Restaurants";

export default function CustomerApp() {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="" element={<Restaurants />} />
        <Route path="registration" element={<Registration />} />
      </Routes>
    </Container>
  );
}
