import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AllDestinations.css";

const AllDestinations = ({
  page = 1,
  setTotalTrips,
  showButton = true,
  apiUrl,
  showDiscount = false,
  filterMonth = "",
}) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, cart } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Si hay un mes seleccionado, escaneamos las páginas 1 a la 6 para encontrar viajes de todo el año
        // Si no hay mes (Home), solo cargamos la página solicitada
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
              return []; // Si una página no existe, devolvemos array vacío
            }
          }),
        );

        // Aplanamos todos los resultados en una sola lista de viajes básicos
        const basicTrips = allPagesResults.flat();

        // Eliminamos duplicados por ID por si acaso
        const uniqueTrips = Array.from(
          new Map(basicTrips.map((item) => [item.id, item])).values(),
        );

        // Buscamos el detalle de cada viaje para obtener el startDate que no viene en el listado
        const fullTrips = await Promise.all(
          uniqueTrips.map(async (trip) => {
            try {
              const detailRes = await fetch(
                `https://api-project-jani-and-mat.com/api/general/getTrip/${trip.id}`,
              );
              const detailData = await detailRes.json();
              return { ...trip, ...detailData.data };
            } catch (err) {
              return trip;
            }
          }),
        );

        setTrips(fullTrips);
        if (setTotalTrips) setTotalTrips(fullTrips.length);
      } catch (error) {
        console.error("Error cargando datos del calendario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [page, filterMonth]); // Se dispara cuando cambias de mes

  const filteredTrips = trips.filter((trip) => {
    if (!trip?.id) return false;
    const id = trip.id.toString();

    // Filtro de Favoritos y Carrito
    if (favorites.includes(id) || cart.includes(id)) return false;

    // Filtro por Mes
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
          <h2>
            {filterMonth
              ? `Exploring destinations for month ${filterMonth}`
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
              <p>Scanning all trip pages for available dates... ✈️</p>
            </div>
          ) : filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <Link
                key={trip.id}
                to={`/product/${trip.id}`}
                className="trip-card"
              >
                <div className="image-wrapper">
                  <img
                    src={trip.imageUrls?.[0] || trip.imageUrl}
                    alt={trip.place}
                  />
                  <div className="overlay"></div>
                </div>
                <div className="card-content">
                  <h3>{trip.place}</h3>
                  <div
                    className="trip-dates"
                    style={{
                      margin: "10px 0",
                      color: "var(--main-color)",
                      fontWeight: "bold",
                    }}
                  >
                    📅 {trip.startDate}
                  </div>
                  <div className="meta">
                    <span className="price">{trip.price}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "80px",
              }}
            >
              <h3>No trips found for month {filterMonth}</h3>
              <p style={{ color: "gray" }}>
                Try June, July or August to see results!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllDestinations;
