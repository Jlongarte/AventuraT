import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AuthForm.css";

const API_BASE = "https://api-project-jani-and-mat.com";

function AuthForm({ isLogin, title, buttonText }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMsg("");
    setLoading(true);

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch {
      setErrors(["Something went wrong. Please try again later."]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const json = await res.json();

    if (json.status === "Success") {
      login({
        token: json.data.token,
        id: json.data.id,
        name: json.data.name,
        email: json.data.email,
        imageUrl: json.data.imageUrl,
      });
      setSuccessMsg("Welcome back! You're now signed in.");
      setTimeout(() => navigate("/"), 1500);
    } else {
      parseErrors(json.data);
    }
  };

  const handleRegister = async () => {
    const res = await fetch(`${API_BASE}/api/customer/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      }),
    });

    const json = await res.json();

    if (json.status === "Created") {
      setSuccessMsg("Account created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } else {
      parseErrors(json.data);
    }
  };

  const parseErrors = (data) => {
    if (Array.isArray(data)) {
      setErrors(data);
    } else if (typeof data === "string") {
      setErrors([data]);
    } else {
      setErrors(["An unexpected error occurred."]);
    }
  };

  return (
    <section className="form">
      <div className="container">
        <h2>
          {title} <br />
          <span className="red-color">Your Account</span>
        </h2>

        <form className="form-card" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Type your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Type your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Type your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Type your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Type your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {errors.length > 0 && (
            <div className="form-errors">
              {errors.map((err, i) => (
                <p key={i}>{err}</p>
              ))}
            </div>
          )}

          {successMsg && <div className="form-success">{successMsg}</div>}

          <button type="submit" className="btn submit" disabled={loading}>
            {loading ? "Please wait..." : buttonText}
            {!loading && <span>↘</span>}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthForm;
