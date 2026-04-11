import { useState } from "react";
import "./Form.css";

const API_URL = "https://api-project-jani-and-mat.com";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_URL}/api/general/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form" id="form">
      <h2>
        Do you Have any Questions? <br></br>
        <span className="red-color">Get in Touch!</span>
      </h2>
      <p className="email-p">
        Email us and we will get back to you as soon as possible.
      </p>

      {status === "success" && (
        <p className="form-status success">Your message has been sent successfully!</p>
      )}
      {status === "error" && (
        <p className="form-status error">Something went wrong. Please try again.</p>
      )}

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="firstName" placeholder="Type Your First Name" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" placeholder="Type Your Last Name" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" placeholder="Type Your Email Address" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="Enter your number" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group full">
          <label>Messages</label>
          <textarea name="message" placeholder="Write your needs..." value={formData.message} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn submit" disabled={loading}>
          {loading ? "Sending..." : "Submit Request"}
          {!loading && <span>↘</span>}
        </button>
      </form>
    </section>
  );
};

export default Form;
