import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import "./AllDestinations.css";

const AllDestinations = ({ page = 1, perPage = 9, setTotalTrips }) => {
  const [trips, setTrips] = useState([]);

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
          <Button text="Book Your Trip" className="primary" />
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
