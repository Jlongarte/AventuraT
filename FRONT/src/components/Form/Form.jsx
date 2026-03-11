import "./Form.css";

const Form = () => {
  return (
    <section className="form">
      <h2>
        Let's Start Planning <br />
        Your Next <span className="red-color">Great Journey</span>
      </h2>

      <form className="form-card">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Type Your Full Name" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Type Your Email Address" />
        </div>

        <div className="form-group">
          <label>Arrived</label>
          <input type="date" />
        </div>

        <div className="form-group">
          <label>Date & Time</label>
          <input type="datetime-local" />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="Enter your number" />
        </div>

        <div className="form-group">
          <label>Guests</label>
          <input type="text" placeholder="2 Child, 2 Adult" />
        </div>

        <div className="form-group full">
          <label>Messages</label>
          <textarea placeholder="Write your needs..." />
        </div>

        <button type="submit" className="btn submit">
          Submit Request
          <span>↘</span>
        </button>
      </form>
    </section>
  );
};

export default Form;
