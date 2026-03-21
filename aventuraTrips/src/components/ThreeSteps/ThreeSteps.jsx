import "./ThreeSteps.css";

const TripSteps = () => {
  return (
    <section className="steps">
      <div className="container">
        <h2>Plan Your Trip in 3 Steps</h2>

        <div className="trip-steps-grid">
          <div className="trip-step-card">
            <div className="trip-step-number">1</div>
            <h3 className="trip-step-heading">
              <i className="fa-solid fa-earth-americas"></i> Choose Destination
            </h3>
            <p className="trip-step-desc">
              Pick a place that excites you — from cities to urban area’s hidden
              gems.
            </p>
          </div>

          <div className="trip-step-card">
            <div className="trip-step-number">2</div>
            <h3 className="trip-step-heading">
              <i className="fa-solid fa-wand-magic-sparkles"></i> Customize Your
              Experience
            </h3>
            <p className="trip-step-desc">
              Select activities, stays, and add-ons to match your own style.
            </p>
          </div>

          <div className="trip-step-card">
            <div className="trip-step-number">3</div>
            <h3 className="trip-step-heading">
              <i className="fa-solid fa-plane-departure"></i> Book & Go
            </h3>
            <p className="trip-step-desc">
              Confirm your trip in minutes and start the countdown.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripSteps;
