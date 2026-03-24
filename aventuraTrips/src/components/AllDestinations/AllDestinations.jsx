import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button.jsx";
import "./AllDestinations.css";

const AllDestinations = ({
  page = 1,
  setTotalTrips,
  showButton = true,
  apiUrl,
  showDiscount = false,
}) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para la suavidad de la paginación
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const url =
          apiUrl ||
          `https://api-project-jani-and-mat.com/api/general/getTrips/${page}`;
        const res = await fetch(url);
        const data = await res.json();
        const tripsData = data.data || [];

        setTrips(tripsData);
        if (setTotalTrips) setTotalTrips(tripsData.length);

        // Delay para la paginación suave
        setTimeout(() => setLoading(false), 100);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTrips();
  }, [page, apiUrl, setTotalTrips]);

  return (
    <section className="destinations">
      <div className="container">
        <div className="discover">
          <h2>Discover the World's Most Loved Destinations</h2>
          {showButton && (
            <Button
              text="Book Your Trip"
              className="primary"
              onClick={() => navigate("/destinations")}
            />
          )}
        </div>

        {/* Animación para la paginación */}
        <div className={`trips-grid ${loading ? "loading-out" : "fade-in"}`}>
          {trips.map((trip) => (
            <Link
              key={trip.id}
              to={`/product/${trip.id}`}
              className="trip-card"
            >
              <div className="image-wrapper">
                <img src={trip.imageUrl} alt={trip.place} />
                <div className="overlay"></div>
              </div>
              <div className="card-content">
                <h3>{trip.place}</h3>
                <p>{trip.title}</p>
                <div className="meta">
                  {showDiscount && trip.isDiscount && (
                    <span className="discount">
                      🔥 {trip.discountPercentage}% OFF
                    </span>
                  )}
                  <span className="price">{trip.price}</span>
                  <span className="rating">⭐ {trip.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllDestinations;
