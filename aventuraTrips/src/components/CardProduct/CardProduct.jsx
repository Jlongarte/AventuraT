import "./CardProduct.css";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom"; // Importamos useLocation
import { useAuth } from "../../context/AuthContext";

const CardProduct = () => {
  const { id } = useParams();
  const location = useLocation(); // Hook para recibir el state del Link
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [showToast, setShowToast] = useState({ show: false, message: "" });
  const { user, favorites, addFavoriteLocally, cart, addToCartLocally } =
    useAuth();

  // Detectamos si venimos desde MyTrips
  const isFromBooking = location.state?.fromBooking || false;

  const isFav = favorites.some((favId) => favId.toString() === id.toString());
  const isInCart = cart.some((cartId) => cartId.toString() === id.toString());

  const triggerToast = (msg) => {
    setShowToast({ show: true, message: msg });
    setTimeout(() => setShowToast({ show: false, message: "" }), 3000);
  };

  const handleAddToFavorite = async () => {
    if (!user) {
      alert("Please log in to add trips to your favorites!");
      return;
    }
    try {
      const url = `https://api-project-jani-and-mat.com/api/customer/addToFavorite/${id}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) {
        addFavoriteLocally(id);
        triggerToast("Trip added to favorites! ❤️");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to your cart!");
      return;
    }
    try {
      const url = `https://api-project-jani-and-mat.com/api/customer/addToCart/${id}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.ok) {
        addToCartLocally(id);
        triggerToast("Trip added to cart! 🛒");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const fetchTripById = async () => {
      try {
        setLoading(true);
        const url = `https://api-project-jani-and-mat.com/api/general/getTrip/${id}`;
        const res = await fetch(url);
        const json = await res.json();
        const trip = json.data;

        if (trip) {
          setProduct({
            title: trip.title,
            location: trip.place,
            price: trip.price,
            description: trip.description,
            images: trip.imageUrls || [],
            rating: trip.rating || 0,
            startDate: trip.startDate,
            endDate: trip.endDate,
            watchers: trip.watching || 0,
            sold: trip.sold || 0,
            isDiscount: trip.isDiscount,
            discountPercentage: trip.discountPercentage,
          });
          setMainImage(trip.imageUrls?.length > 0 ? trip.imageUrls[0] : "");
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTripById();
  }, [id]);

  if (loading) return <div className="loading">Loading trip details...</div>;
  if (!product) return <div className="error">Trip not found.</div>;

  return (
    <div className="product-container">
      {showToast.show && (
        <div id="fav-toast-bubble" className="toast-bubble-container">
          <span className="toast-text">{showToast.message}</span>
        </div>
      )}

      <div className="gallery-product">
        <div className="main-image-wrapper">
          <img className="main-image" src={mainImage} alt={product.title} />
        </div>
        <div className="thumbnails">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={mainImage === img ? "active-thumb" : ""}
              onClick={() => setMainImage(img)}
              alt="thumb"
            />
          ))}
        </div>
      </div>

      <div className="details">
        <h1>
          Discover <span className="aventura">{product.location}</span>
        </h1>

        <div className="rating-section">
          <span className="stars">
            {"⭐".repeat(Math.floor(product.rating))}
          </span>
          <span className="rating-number">{product.rating} Stars</span>
        </div>

        <div className="price-section">
          {product.isDiscount ? (
            <div className="price-container">
              <span className="original-price">{product.price}</span>
              <span className="discount-tag">
                -{product.discountPercentage}% OFF
              </span>
            </div>
          ) : (
            <span className="price-tag">{product.price}</span>
          )}
        </div>

        <div className="stats-pills">
          <span>👁️ {product.watchers} people are watching</span>
          <span>🔥 {product.sold} sold recently</span>
        </div>

        <div className="info-box">
          <p>
            <strong>Start Date:</strong> {product.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {product.endDate}
          </p>
        </div>

        <div className="description-section">
          <h3>About this trip</h3>
          <p className="description">{product.description}</p>
        </div>

        {/* SI NO VIENE DE BOOKING, MUESTRA LOS BOTONES */}
        {!isFromBooking ? (
          <div className="actions">
            {!isFav ? (
              <button className="second-btn" onClick={handleAddToFavorite}>
                Add to Favorites
              </button>
            ) : (
              <button className="second-btn already-fav" disabled>
                Saved in Favorites
              </button>
            )}

            {!isInCart ? (
              <button className="second-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            ) : (
              <Link to="/cart" className="second-btn in-cart-link">
                View in Cart
              </Link>
            )}

            <Link to={`/checkout/${id}`} className="second-btn buy-now-link">
              Buy It Now
            </Link>
          </div>
        ) : (
          /* MENSAJE SI YA ESTÁ COMPRADO */
          <div className="actions">
            <div className="already-booked-msg">
              ✅ This trip is already in your bookings
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProduct;
