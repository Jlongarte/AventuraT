import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AllDestinations.css";

const AllDestinations = ({
  page = 1,
  setTotalTrips,
  filterMonth = "",
  monthLabel = "",
  apiUrl = "",
  showDiscount = false,
}) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, cart } = useAuth();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        let rawTrips = [];

        if (apiUrl && apiUrl.trim() !== "") {
          const res = await fetch(apiUrl);
          const data = await res.json();
          rawTrips = data?.data || [];
        } else {
          const pagesToFetch = filterMonth ? [1, 2, 3, 4, 5, 6] : [page];
          const allPagesResults = await Promise.all(
            pagesToFetch.map(async (p) => {
              try {
                const res = await fetch(
                  `https://api-project-jani-and-mat.com/api/general/getTrips/${p}`,
                );
                const data = await res.json();
                return data?.data || [];
              } catch (e) {
                return [];
              }
            }),
          );
          rawTrips = allPagesResults.flat();
        }

        const uniqueTrips = Array.from(
          new Map(rawTrips.map((item) => [item.id, item])).values(),
        );

        const fullTrips = await Promise.all(
          uniqueTrips.map(async (trip) => {
            try {
              // Si ya tiene startDate y discountPercentage (caso Offers), lo mantenemos
              if (trip.startDate && trip.discountPercentage) return trip;

              const detailRes = await fetch(
                `https://api-project-jani-and-mat.com/api/general/getTrip/${trip.id}`,
              );
              const detailData = await detailRes.json();
              return { ...detailData.data, ...trip };
            } catch (err) {
              return trip;
            }
          }),
        );

        setTrips(fullTrips);
        if (setTotalTrips) setTotalTrips(fullTrips.length);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [page, filterMonth, apiUrl]);

  // Lógica de filtrado
  const filteredTrips = trips.filter((trip) => {
    if (!trip?.id) return false;
    const id = trip.id.toString();

    // No mostrar si ya está en favoritos o carrito
    if (favorites.includes(id) || cart.includes(id)) return false;

    // Filtrado por mes
    if (filterMonth) {
      const dateStr = trip.startDate || "";
      const parts = dateStr.split(/[\/-]/);

      if (parts.length >= 2) {
        let monthOfTrip = parts[1].trim();
        if (monthOfTrip.length === 1) monthOfTrip = "0" + monthOfTrip;
        return monthOfTrip === filterMonth;
      }
      return false;
    }
    return true;
  });

  return (
    <section className="destinations">
      <div className="container">
        <div className="discover">
          <h2 style={{ textTransform: "capitalize" }}>
            {showDiscount
              ? "Special Offers"
              : filterMonth
                ? `Exploring destinations for ${monthLabel || filterMonth}`
                : "Discover the World"}
          </h2>
        </div>

        <div className={`trips-grid ${loading ? "loading-out" : "fade-in"}`}>
          {loading ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "50px",
              }}
            >
              <p>Scanning trips... ✈️</p>
            </div>
          ) : filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => {
              const hasDiscount = trip.isDiscount === true;
              const percentage = trip.discountPercentage;

              return (
                <Link
                  key={trip.id}
                  to={`/product/${trip.id}`}
                  className="trip-card"
                >
                  <div className="image-wrapper">
                    <img
                      src={trip.imageUrl || trip.imageUrls?.[0]}
                      alt={trip.place}
                    />

                    {/* Renderizamos el porcentaje solo si existe isDiscount y el valor */}
                    {hasDiscount && percentage && (
                      <div className="discount-tag">-{percentage}%</div>
                    )}

                    <div className="overlay"></div>
                  </div>
                  <div className="card-content">
                    <h3>{trip.place}</h3>
                    <div className="trip-dates">📅 {trip.startDate}</div>
                    <div className="meta">
                      <span className="price">{trip.price}</span>
                      {/* Mostramos el precio antiguo si hay */}
                      {(trip.oldPrice || trip.originalPrice) && (
                        <span className="original-price">
                          {trip.oldPrice || trip.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "80px",
              }}
            >
              <h3>No trips found</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllDestinations;
