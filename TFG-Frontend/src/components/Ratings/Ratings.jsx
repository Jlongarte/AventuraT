import "./Ratings.css";

import { useEffect, useRef } from "react";

const Ratings = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    // --- Función de conteo animado ---
    const animateCount = (element, target, duration = 2000) => {
      let start = 0;
      const isFloat = target % 1 !== 0;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);

          if (target >= 1000 && !isFloat) {
            element.textContent = (target / 1000).toFixed(1) + "K";
          } else if (!isFloat && target < 1000) {
            element.textContent = target + "+";
          } else {
            element.textContent = target.toFixed(1);
          }
        } else {
          element.textContent = isFloat ? start.toFixed(1) : Math.floor(start);
        }
      }, 16);
    };

    const statsSection = statsRef.current;

    if (statsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              statsSection.classList.add("visible");

              const counters = statsSection.querySelectorAll("h3");
              counters.forEach((counter) => {
                const target = parseFloat(counter.getAttribute("data-target"));
                animateCount(counter, target);
              });

              observer.unobserve(statsSection);
            }
          });
        },
        { threshold: 0.3 },
      );

      observer.observe(statsSection);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <section className="ratings">
        <h2>
          Rated Excellent by Over <br />{" "}
          <span className="red-color">500K Happy Global Travelers</span>
        </h2>
      </section>
      <div className="container">
        <section className="stats" id="stats" ref={statsRef}>
          <div className="stat">
            <h3 data-target="4500">0</h3>
            <p>Trips Booked</p>
          </div>
          <div className="stat">
            <h3 data-target="30">0</h3>
            <p>Destinations Covered</p>
          </div>
          <div className="stat">
            <h3 data-target="150">0</h3>
            <p>Verified Stays</p>
          </div>
          <div className="stat">
            <h3 data-target="4.7">0</h3>
            <p>Customer Rating</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Ratings;
