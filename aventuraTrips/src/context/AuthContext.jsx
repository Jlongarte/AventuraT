import { createContext, useContext, useState, useEffect } from "react";

const API_URL = "https://api-project-jani-and-mat.com";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados iniciales cargados de localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Al montar la app: verificar si hay un token guardado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API_URL}/api/user/verifyToken`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
          const { id, name, email, role, imageUrl } = data.data;
          setUser({ token, id, name, email, role, imageUrl });
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Override global de fetch para capturar token renovado
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      const newToken = response.headers.get("X-New-Token");
      if (newToken) {
        localStorage.setItem("token", newToken);
        setUser((prev) => (prev ? { ...prev, token: newToken } : prev));
      }
      return response;
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  const login = ({ token, id, name, email, role, imageUrl }) => {
    localStorage.setItem("token", token);
    setUser({ token, id, name, email, role, imageUrl });
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

  const clearCartLocally = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#111111",
          gap: "2rem",
        }}
      >
        <img
          src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454036/logoAventura_qge2md.webp"
          alt="AventuraTrips"
          style={{ height: "80px" }}
        />
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid rgba(252, 3, 65, 0.2)",
            borderTop: "4px solid #fc0341",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        favorites,
        addFavoriteLocally,
        removeFavoriteLocally,
        cart,
        addToCartLocally,
        removeFromCartLocally,
        clearCartLocally,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
