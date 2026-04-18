import { useEffect, useRef } from "react";
import "./Hero.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const bubblesRef = useRef([]);

  // Efecto de animación de las burbujas al hacer scroll
  useEffect(() => {
    const hero = heroRef.current;
    const bubbles = bubblesRef.current;

    const handleScroll = () => {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const heroHeight = rect.height;

      const scrolled = Math.min(Math.max(-rect.top, 0), heroHeight);
      const progress = scrolled / heroHeight;

      bubbles.forEach((bubble, index) => {
        if (!bubble) return;
        const speed = parseFloat(bubble.dataset.speed);
        const yOffset = progress * 150 * speed;
        const xOffset = Math.sin(progress * Math.PI * (index + 1)) * 15;
        bubble.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efecto de fade-in al montar el componente
  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      hero.style.opacity = 0;
      hero.style.transition = "opacity 1.5s ease";
      setTimeout(() => (hero.style.opacity = 1), 200);
    }
  }, []);

  const bubblesData = [
    {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      speed: 0.2,
    },
    {
      src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      speed: 0.3,
    },
    {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      speed: 0.25,
    },
    {
      src: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
      speed: 0.35,
    },
    {
      src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      speed: 0.2,
    },
    {
      src: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef",
      speed: 0.3,
    },
  ];

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="container">
        <div className="hero-bg">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="/assets/AdobeStock_118726863.mov" type="video/mp4" />
            Your browser does not support video.
          </video>
        </div>

        <div className="bubbles">
          {bubblesData.map((bubble, i) => (
            <img
              key={i}
              ref={(el) => (bubblesRef.current[i] = el)}
              src={bubble.src}
              className="bubble"
              data-speed={bubble.speed}
              alt={`Bubble ${i + 1}`}
            />
          ))}
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your Next Great <br /> Adventure
          </h1>

          <div className="hero-buttons">
            <Button
              text="Book Your Trip"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3l10 10M13 3h-10v10" />
                </svg>
              }
              className="primary"
              onClick={() => navigate("/destinations")}
            />

            <Button
              text="Contact Us"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3l10 10M13 3h-10v10" />
                </svg>
              }
              className="secondary"
              onClick={() => navigate("/#form")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
