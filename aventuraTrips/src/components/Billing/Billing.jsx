import "./Bilings.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_BASE = "https://api-project-jani-and-mat.com";

function PaymentForm() {
  const { id } = useParams();
  const { user, clearCartLocally, removeFavoriteLocally } = useAuth();

  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successData, setSuccessData] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    dob: "",
    sex: "",
    phoneNumber: "",
    idPassport: "",
    street: "",
    number: "",
    postCode: "",
    country: "",
  });

  useEffect(() => {
    const loadTrips = async () => {
      if (!user) {
        setLoadingTrips(false);
        return;
      }

      try {
        setLoadingTrips(true);

        if (id) {
          const res = await fetch(`${API_BASE}/api/general/getTrip/${id}`);
          const json = await res.json();
          if (json.data) {
            setTrips([json.data]);
          }
        } else {
          const res = await fetch(`${API_BASE}/api/customer/getCart`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const json = await res.json();
          setTrips(json.data || []);
        }
      } catch {
        setErrors(["Could not load trip information. Please try again."]);
      } finally {
        setLoadingTrips(false);
      }
    };

    loadTrips();
  }, [id, user]);

  // Pre-rellenado del email si el usuario está logueado
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const calculateTotal = () => {
    return trips.reduce((acc, trip) => {
      const priceString = trip.price
        ? trip.price.toString().replace(/[^\d.]/g, "")
        : "0";
      return acc + (parseFloat(priceString) || 0);
    }, 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDateForBackend = (dateStr) => {
    if (!dateStr) return "";
    // Input type="date" gives YYYY-MM-DD, backend expects MM/dd/yyyy
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Client-side validation
    const validationErrors = [];
    if (!formData.email) validationErrors.push("Email is required");
    if (!formData.fullName) validationErrors.push("Full name is required");
    if (!formData.dob) validationErrors.push("Date of birth is required");
    if (!formData.sex) validationErrors.push("Sex is required");
    if (!formData.phoneNumber)
      validationErrors.push("Phone number is required");
    if (!formData.idPassport)
      validationErrors.push("ID / Passport number is required");
    if (!formData.street) validationErrors.push("Street is required");
    if (!formData.number) validationErrors.push("House number is required");
    if (!formData.postCode) validationErrors.push("Post code is required");
    if (!formData.country) validationErrors.push("Country is required");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (trips.length === 0) {
      setErrors(["No trips selected for purchase."]);
      return;
    }

    setSubmitting(true);

    try {
      const body = {
        email: formData.email,
        name: formData.fullName,
        birthDate: formatDateForBackend(formData.dob),
        sex: formData.sex,
        phone: formData.phoneNumber,
        documentNumber: formData.idPassport,
        street: formData.street,
        houseNumber: formData.number,
        postCode: formData.postCode,
        country: formData.country,
        tripIds: trips.map((t) => t.id),
      };

      const res = await fetch(`${API_BASE}/api/customer/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (res.ok && json.status === "Success") {
        clearCartLocally();
        trips.forEach((t) => removeFavoriteLocally(t.id));
        setSuccessData(json.data);
      } else {
        // Parseamos errores
        if (Array.isArray(json.data)) {
          if (json.status === "Conflict") {
            setErrors([json.message]);
          } else {
            setErrors(json.data);
          }
        } else if (typeof json.data === "string") {
          setErrors([json.data]);
        } else if (json.message) {
          setErrors([json.message]);
        } else {
          setErrors(["Something went wrong. Please try again."]);
        }
      }
    } catch {
      setErrors([
        "Connection error. Please check your internet and try again.",
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  // Si el usuario no stá registrado
  if (!user) {
    return (
      <div className="checkout-login-required">
        <h2>Please log in to continue</h2>
        <Link to="/login" className="checkout-login-btn">
          Login
        </Link>
      </div>
    );
  }

  if (loadingTrips) {
    return <div className="checkout-loading">Loading checkout...</div>;
  }

  if (trips.length === 0 && !successData) {
    return (
      <div className="checkout-empty">
        <h2>No trips to purchase</h2>
        <p>Your cart is empty or the trip was not found.</p>
        <Link to="/destinations" className="checkout-login-btn">
          Explore Destinations
        </Link>
      </div>
    );
  }

  if (successData) {
    return (
      <section className="checkout-success">
        <div className="success-card">
          <div className="success-icon">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <h2>Purchase Completed!</h2>
          <p className="success-subtitle">
            Thank you for booking with AventuraTrips
          </p>

          <div className="success-details">
            <h3>Your Trips</h3>
            <ul>
              {successData.tripTitles.map((title, i) => (
                <li key={i}>
                  <i className="fa-solid fa-plane-departure"></i> {title}
                </li>
              ))}
            </ul>
            <div className="success-total">
              <span>Total Paid</span>
              <strong>{successData.totalPaid}</strong>
            </div>
          </div>

          <p className="success-email-note">
            A confirmation email has been sent to{" "}
            <strong>{formData.email}</strong>
          </p>

          <div className="success-actions">
            <Link to="/destinations" className="btn submit">
              Continue Exploring
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">
        <div className="order-summary">
          <h2>
            Order <span className="red-color">Summary</span>
          </h2>

          <div className="order-items">
            {trips.map((trip) => (
              <div key={trip.id} className="order-item">
                <img
                  src={trip.imageUrl || (trip.imageUrls && trip.imageUrls[0])}
                  alt={trip.title}
                />
                <div className="order-item-info">
                  <h4>{trip.title}</h4>
                  <p className="order-item-place">{trip.place}</p>
                  <p className="order-item-price">{trip.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Total</span>
            <strong>{calculateTotal().toFixed(2)}€</strong>
          </div>
        </div>

        {/* Formulario de Pago */}
        <div className="billing-section">
          <h2>
            Billing <span className="red-color">Details</span>
          </h2>

          <form className="billing-form" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className="form-group full">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="First and Last Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Sex</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="custom-select"
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="+34 000 000 000"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>ID / Passport</label>
              <input
                type="text"
                name="idPassport"
                placeholder="Document Number"
                value={formData.idPassport}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="form-group full form-separator">
              <hr />
              <p className="section-label">Address Details</p>
            </div>

            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="street"
                placeholder="Street name"
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Number</label>
              <input
                type="text"
                name="number"
                placeholder="House / Apt number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Post Code</label>
              <input
                type="text"
                name="postCode"
                placeholder="Postal Code"
                value={formData.postCode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            {/* Errores */}
            {errors.length > 0 && (
              <div className="form-errors">
                {errors.map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}

            <button type="submit" className="btn submit" disabled={submitting}>
              {submitting
                ? "Processing..."
                : `PAY ${calculateTotal().toFixed(2)}€`}
              {!submitting && <span> ↘</span>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PaymentForm;
