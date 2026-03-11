import "./Gallery.css";
import Button from "../Button/Button";
import { useEffect } from "react";

const Gallery = () => {
  useEffect(() => {
    // Seleccionamos los elementos de la galería
    const galleryItems = document.querySelectorAll(".gallery-item");

    // Creamos el observador
    const galleryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            galleryObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    // Añadimos delay progresivo y observamos cada item
    galleryItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.15}s`;
      galleryObserver.observe(item);
    });

    // Cleanup al desmontar el componente
    return () => {
      galleryItems.forEach((item) => galleryObserver.unobserve(item));
      galleryObserver.disconnect();
    };
  }, []);

  return (
    <section className="gallery">
      <div className="container">
        <div className="discover">
          <h2>
            Our Visual Journey Through <br />
            <span className="red-color"> Unforgettable Destinations</span>
          </h2>
          <Button
            text="Book Your Trip"
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
            className="primary"
            onClick={() => console.log("secondary button clicked")}
          />
        </div>

        <div className="gallery-grid">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className={`gallery-item item-${index + 1}`}>
              <img
                src="/assets/unnamed.jpg"
                alt={`Gallery item ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
