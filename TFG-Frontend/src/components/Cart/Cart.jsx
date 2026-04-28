import "./Cart.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, user, removeFromCartLocally } = useAuth();
  const [cartTrips, setCartTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FUNCIÓN DE SUMA TOTAL ---
  const calculateTotal = () => {
    return cartTrips.reduce((acc, trip) => {
      //  eliminamos el símbolo "€"
      const priceString = trip.price
        ? trip.price.toString().replace(/[^\d.]/g, "")
        : "0";

      // Convertimos a número decimal
      const priceValue = parseFloat(priceString) || 0;
      return acc + priceValue;
    }, 0);
  };

  useEffect(() => {
    const fetchCartFromServer = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          "https://api-project-jani-and-mat.com/api/customer/getCart",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );
        const json = await res.json();
        setCartTrips(json.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartFromServer();
  }, [user, cart?.length]);

  const handleRemove = async (e, tripId) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api-project-jani-and-mat.com/api/customer/removeFromCart/${tripId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      if (res.ok) {
        if (removeFromCartLocally) removeFromCartLocally(tripId);
        setCartTrips((prev) => prev.filter((t) => t.id !== tripId));
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  if (!user) {
    return (
      <div className="login-required-message">
        <h2>Please log in to view your Cart</h2>
        <Link to="/login" className="explore-btn">
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading your cart...</div>;
  }

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>My Shopping Cart 🛒</h1>
      </header>

      {cartTrips.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <Link to="/destinations" className="explore-btn">
            Discover destinations
          </Link>
        </div>
      ) : (
        <div className="cart-content-wrapper">
          <div className="trips-grid">
            {cartTrips.map((trip) => (
              <Link
                to={`/product/${trip.id}`}
                key={trip.id}
                className="trip-card"
              >
                <div className="image-wrapper">
                  <img src={trip.imageUrl} alt={trip.title} />
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
                      <span className="current-price">{trip.price}</span>
                    </div>
                  </div>
                  <p>📍 {trip.place}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-info">
              {/* Mostramos el total con 2 decimales */}
              <h3>Total: {calculateTotal().toFixed(2)}€</h3>
              <p>{cartTrips.length} trips in your cart</p>
            </div>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
