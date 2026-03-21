import { useState } from "react";
import "./AuthForm.css";

function AuthForm({ isLogin, title, buttonText }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, formData);
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
                  name="name"
                  placeholder="Type your first name"
                  value={formData.name}
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
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
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

          <button type="submit" className="btn submit">
            {buttonText}
            <span>↘</span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthForm;
