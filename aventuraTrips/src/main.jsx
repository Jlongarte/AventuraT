import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home.jsx";
import DatesPage from "./pages/Dates.jsx";
import Destinations from "./pages/Destinations.jsx";
import Offers from "./pages/Offers.jsx";
import Team from "./pages/Team.jsx";
import CartPage from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductPage from "./pages/CardProducts.jsx";
import Payment from "./pages/Payment.jsx";
import WishList from "./pages/WishList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="dates" element={<DatesPage />} />
            <Route path="offers" element={<Offers />} />
            <Route path="team" element={<Team />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishList />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route
              path="checkout/:id"
              element={<Payment title="Complete Your" />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
