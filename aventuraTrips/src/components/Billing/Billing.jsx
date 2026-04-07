import "./Bilings.css";
import { useState } from "react";

function PaymentForm({ title }) {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Data Submitted:", formData);
  };

  return (
    <section className="form">
      <div className="container">
        <h2>
          {title} <br />
          <span className="red-color">Payment Details</span>
        </h2>

        <form className="form-card" onSubmit={handleSubmit}>
          {/* Email  */}
          <div className="form-group full">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* NOMBRE COMPLETO */}
          <div className="form-group full">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="First and Last Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* FECHA DE NACIMIENTO */}
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* SEXO */}
          <div className="form-group">
            <label>Sex</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="custom-select"
              required
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* TELEFONO */}
          <div className="form-group">
            <label>Telephone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="+34 000 000 000"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* ID / PASSPORTE */}
          <div className="form-group">
            <label>ID / PASSPORT</label>
            <input
              type="text"
              name="idPassport"
              placeholder="Document Number"
              value={formData.idPassport}
              onChange={handleChange}
              required
            />
          </div>

          {/* DIRECCIÓN*/}
          <div className="form-group full" style={{ marginTop: "10px" }}>
            <hr />
            <p style={{ fontWeight: "bold", fontSize: "14px" }}>
              Address Details
            </p>
          </div>

          {/* CALLE */}
          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              name="street"
              placeholder="Street name"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>

          {/* NUMERO*/}
          <div className="form-group">
            <label>Number</label>
            <input
              type="text"
              name="number"
              placeholder="House/Apt number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>

          {/* CÓDIGO POSTAL */}
          <div className="form-group">
            <label>Post Code</label>
            <input
              type="text"
              name="postCode"
              placeholder="Postal Code"
              value={formData.postCode}
              onChange={handleChange}
              required
            />
          </div>

          {/* PAIS */}
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn submit">
            PAYMENT <span>↘</span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default PaymentForm;
