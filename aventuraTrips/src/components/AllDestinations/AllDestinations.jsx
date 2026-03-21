import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import "./AllDestinations.css";

const AllDestinations = ({
  title,
  subtitle,
  page = 1,
  perPage = 9,
  onlyDiscount = false,
}) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(
          "https://api-project-jani-and-mat.com/api/general/getRandomTrips/10",
        );
        if (!res.ok) throw new Error("Error en la API");

        const data = await res.json();

        // Filtrar por viajes en oferta
        const filteredTrips = onlyDiscount
          ? data.data.filter((trip) => trip.isDiscount)
          : data.data;

        // Paginación
        const start = (page - 1) * perPage;
        const end = start + perPage;

        setTrips(filteredTrips.slice(start, end));
      } catch (error) {
        console.error(error);
        setTrips([]);
      }
    };

    fetchTrips();
  }, [page, perPage, onlyDiscount]);

  return (
    <section className="destinations">
      <div className="container">
        {title && (
          <div className="discover">
            <h2>
              {title} <br />
              {subtitle && <span className="red-color">{subtitle}</span>}
            </h2>
            <Button text="Book Your Trip" className="primary" />
          </div>
        )}

        <div className="trips-grid">
          {trips.map((trip) => (
            <Link
              to={`/product/${trip.id}`}
              key={trip.id}
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
                  {trip.isDiscount ? (
                    <>
                      <span className="price">
                        €
                        {(
                          parseFloat(trip.price.replace("€", "")) *
                          (1 - trip.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                      <span className="original-price">
                        €{parseFloat(trip.price.replace("€", "")).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="price">{trip.price}</span>
                  )}
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
