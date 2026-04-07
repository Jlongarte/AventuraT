import "./Favorites.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, user, removeFavoriteLocally } = useAuth();
  const [favoriteTrips, setFavoriteTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritesFromServer = async () => {
      // Si no hay usuario, dejamos de cargar para mostrar el mensaje de login
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          "https://api-project-jani-and-mat.com/api/customer/getFavorites",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );
        const json = await res.json();
        setFavoriteTrips(json.data || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoritesFromServer();
  }, [user, favorites.length]);

  const handleRemove = async (e, tripId) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api-project-jani-and-mat.com/api/customer/removeFromFavorite/${tripId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      if (res.ok) {
        removeFavoriteLocally(tripId);
        setFavoriteTrips((prev) => prev.filter((t) => t.id !== tripId));
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // --- LÓGICA DE MENSAJES CONDICIONALES ---

  // 1. Si no hay usuario logueado
  if (!user) {
    return (
      <div className="login-required-message">
        <h2>Please log in to view your Favorites</h2>
        <Link stroke to="/login" className="explore-btn">
          Login
        </Link>
      </div>
    );
  }

  // 2. Si el usuario está logueado pero los datos aún se están descargando
  if (loading) {
    return <div className="loading">Loading your wishlist...</div>;
  }

  return (
    <div className="favorites-container">
      <header className="fav-header">
        <h1>My Wishlist ❤️</h1>
      </header>

      {favoriteTrips.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't saved any trips yet.</p>
          <Link to="/destinations" className="explore-btn">
            Discover destinations
          </Link>
        </div>
      ) : (
        <div className="trips-grid">
          {favoriteTrips.map((trip) => (
            <Link
              to={`/product/${trip.id}`}
              key={trip.id}
              className="trip-card"
            >
              <div className="image-wrapper">
                <img
                  src={trip.imageUrl || trip.imageUrls[0]}
                  alt={trip.title}
                />

                <button
                  className="remove-btn-overlay"
                  onClick={(e) => handleRemove(e, trip.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>

              <div className="card-content">
                <div className="meta">
                  <h3>{trip.title}</h3>
                  <div className="price-info">
                    {trip.isDiscount && (
                      <span className="original-price">
                        {trip.price + trip.price * 0.2}€
                      </span>
                    )}
                    <span className="current-price">{trip.price}€</span>
                  </div>
                </div>
                <p>📍 {trip.place}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
