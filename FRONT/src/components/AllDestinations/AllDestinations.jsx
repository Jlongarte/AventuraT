import trips from "../data.js";
import Button from "../Button/Button.jsx";
import "./AllDestinations.css";

const AllDestinations = ({ title, subtitle, limit = 200 }) => {
  return (
    <section className="destinations">
      <div className="container">
        {title && (
          <div className="discover">
            <h2>
              {title} <br />
              {subtitle && <span className="red-color">{subtitle}</span>}
            </h2>
            <Button
              text="Book Your Trip"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3l10 10M13 3h-10v10" />
                </svg>
              }
              className="primary"
              onClick={() => console.log("secondary button clicked")}
            />
          </div>
        )}

        <div className="trips-grid">
          {trips.slice(0, limit).map((trip, index) => (
            <div className="trip-card" key={index}>
              <div className="image-wrapper">
                <img src={trip.image} alt={trip.destinationName} />
                <div className="overlay"></div>
              </div>
              <div className="card-content">
                <h3>{trip.destinationName}</h3>
                <p>{trip.description}</p>
                <div className="meta">
                  <span className="price">${trip.price}</span>
                  <span className="rating">⭐ {trip.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllDestinations;
