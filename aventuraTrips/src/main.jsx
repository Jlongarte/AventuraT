import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import {
  Home,
  DatesPage,
  MonthPage,
  Destinations,
  Offers,
  Team,
  CartPage,
  Login,
  Register,
  NotFound,
  ProductPage,
  Payment,
  WishList,
  MyBookings,
} from "./pages";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="dates" element={<DatesPage />} />
            <Route path="month/:monthName" element={<MonthPage />} />
            <Route path="offers" element={<Offers />} />
            <Route path="team" element={<Team />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishList />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="checkout" element={<Payment />} />
            <Route path="checkout/:id" element={<Payment />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
