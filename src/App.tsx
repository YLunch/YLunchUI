import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./CustomerApp/Header";
import CustomerApp from "./CustomerApp";
import NotFoundPage from "./NotFoundPage";
import RestaurantApp from "./RestaurantApp";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/customer" element={<CustomerApp />} />
        <Route path="/restaurant-administration" element={<RestaurantApp />} />
        <Route path="/" element={() => <Navigate to="/customer" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
