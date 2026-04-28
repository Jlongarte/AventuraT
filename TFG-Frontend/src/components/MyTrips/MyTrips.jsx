import "./MyTrips.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const MyTrips = () => {
  const { user } = useAuth();
  const [bookedTrips, setBookedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para el modal
  const [tripToCancel, setTripToCancel] = useState(null); // Guarda el ID del viaje
  const [isDeleted, setIsDeleted] = useState(false); // Controla el mensaje de éxito

  useEffect(() => {
    const fetchBookingsFromServer = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://api-project-jani-and-mat.com/api/customer/getBookings",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );
        const json = await res.json();

        if (json.status === "Success" && json.data) {
          const normalized = Array.isArray(json.data) ? json.data : [json.data];
          setBookedTrips(normalized);
        }
      } catch (error) {
        console.error("Error al obtener los viajes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsFromServer();
  }, [user]);

  // Función para eliminar el viaje de la base de datos y del estado
  const handleConfirmCancel = async () => {
    if (!tripToCancel) return;

    try {
      const res = await fetch(
        `https://api-project-jani-and-mat.com/api/customer/removeBooking/${tripToCancel}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      if (res.ok) {
        setIsDeleted(true);
        setBookedTrips((prev) =>
          prev.filter((t) => t.bookingId !== tripToCancel),
        );
        setTimeout(() => {
          setTripToCancel(null);
          setIsDeleted(false);
        }, 1000);
      } else {
        alert("Error canceling the booking. Please try again.");
        setTripToCancel(null);
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      setTripToCancel(null);
    }
  };

  const handleCloseModal = () => {
    if (!isDeleted) {
      setTripToCancel(null);
    }
  };

  if (!user) return <div className="loading">Please login.</div>;
  if (loading) return <div className="loading">Loading your trips...</div>;

  return (
    <div className="my-trips-container">
      <h2 className="section-title">My Booked Trips</h2>

      {bookedTrips.length === 0 ? (
        <div className="no-trips">You haven't booked any trips yet.</div>
      ) : (
        <div className="trips-grid">
          {bookedTrips.map((item) => (
            <div key={item.bookingId} className="trip-card-wrapper">
              <Link
                to={`/product/${item.tripId}`}
                state={{ fromBooking: true }}
                className="trip-card"
              >
                <div className="image-wrapper">
                  <img src={item.imageUrl} alt={item.title} />
                  <div className="status-badge-overlay">Confirmed</div>
                </div>

                <div className="card-content">
                  <div className="meta">
                    <h3>{item.title}</h3>
                    <span className="current-price">{item.price}</span>
                  </div>
                  <p className="location-info">📍 {item.place}</p>
                  {item.purchaseDate && (
                    <p className="purchase-date">
                      Booked on:{" "}
                      {new Date(item.purchaseDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Link>

              <button
                className="cancel-btn"
                onClick={() => setTripToCancel(item.bookingId)}
              >
                Cancel Trip
              </button>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL DE CANCELACIÓN --- */}
      {tripToCancel && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!isDeleted ? (
              <>
                <h3>Are you sure you want to cancel your booking?</h3>
                <div className="modal-actions">
                  <button className="confirm-btn" onClick={handleConfirmCancel}>
                    Yes, I am sure
                  </button>
                  <button className="close-btn" onClick={handleCloseModal}>
                    No
                  </button>
                </div>
              </>
            ) : (
              <div className="success-message">
                <span className="success-icon">✅</span>
                <h3>Your Booking has been cancelled</h3>
                <p>We hope to see you on another adventure soon.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
