import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import "./AllDestinations.css";
import { useNavigate } from "react-router-dom";

const AllDestinations = ({
  page = 1,
  perPage = 9,
  setTotalTrips,
  showButton = true,
}) => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(
          `https://api-project-jani-and-mat.com/api/general/getTrips/${page}`,
        );
        if (!res.ok) throw new Error("Error en la API");

        const data = await res.json();
        const tripsData = data.data || [];

        setTrips(tripsData);
        setTotalTrips && setTotalTrips(tripsData.length);
      } catch (error) {
        console.error(error);
        setTrips([]);
        setTotalTrips && setTotalTrips(0);
      }
    };

    fetchTrips();
  }, [page, setTotalTrips]);

  return (
    <section className="destinations">
      <div className="container">
        <div className="discover">
          <h2>Discover the World's Most Loved Destinations</h2>

          {showButton && (
            <Button
              text="Book Your Trip"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3l10 10M13 3h-10v10" />
                </svg>
              }
              className="primary"
              onClick={() => navigate("/destinations")}
            />
          )}
        </div>

        <div className="trips-grid">
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
