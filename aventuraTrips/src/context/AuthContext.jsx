import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Estados iniciales cargados de localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const login = ({ token, id, name, email, imageUrl }) => {
    localStorage.setItem("token", token);
    setUser({ token, id, name, email, imageUrl });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setFavorites([]);
    setCart([]);
  };

  // --- LÓGICA DE FAVORITOS ---
  const addFavoriteLocally = (tripId) => {
    setFavorites((prev) => {
      if (prev.includes(tripId.toString())) return prev;
      const newFavs = [...prev, tripId.toString()];
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const removeFavoriteLocally = (tripId) => {
    setFavorites((prev) => {
      const newFavs = prev.filter((id) => id.toString() !== tripId.toString());
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  // --- LÓGICA DE CARRITO ---
  const addToCartLocally = (tripId) => {
    setCart((prev) => {
      // Evitamos duplicados si el backend no lo controla
      if (prev.includes(tripId.toString())) return prev;
      const newCart = [...prev, tripId.toString()];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCartLocally = (tripId) => {
    setCart((prev) => {
      const newCart = prev.filter((id) => id.toString() !== tripId.toString());
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        favorites,
        addFavoriteLocally,
        removeFavoriteLocally,
        cart,
        addToCartLocally,
        removeFromCartLocally,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
