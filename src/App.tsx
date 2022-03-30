import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import classes from "./App.module.scss";
import AppContent from "./AppContent";
import RestaurantsList from "./RestaurantsList";
import Footer from "./Footer";
import Header from "./Header";
import FormuleCard from "./FormuleList/FormuleCard";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.wrapper}>
        <BrowserRouter>
          <Header />
          <AppContent />

<FormuleCard/>
          <Footer />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}
