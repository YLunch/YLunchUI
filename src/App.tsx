import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent";
import Footer from "./Footer";
import Header from "./Header";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <AppContent />
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
