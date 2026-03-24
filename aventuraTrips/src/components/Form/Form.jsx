import "./Form.css";

const Form = () => {
  return (
    <section className="form" id="form">
      <h2>
        Do you Have any Questions? <br></br>
        <span className="red-color">Get in Touch!</span>
      </h2>
      <p className="email-p">
        Email us and we will get back to you as soon as possible.
      </p>

      <form className="form-card">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" placeholder="Type Your First Name" />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" placeholder="Type Your Last Name" />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Type Your Email Address" />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="Enter your number" />
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
