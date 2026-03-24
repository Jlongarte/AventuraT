import "./Gallery.css";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          "https://api-project-jani-and-mat.com/api/general/getRandomImages/9",
        );
        const data = await res.json();
        setImages(data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const galleryItems = document.querySelectorAll(".gallery-item");

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

    galleryItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.15}s`;
      galleryObserver.observe(item);
    });

    return () => {
      galleryItems.forEach((item) => galleryObserver.unobserve(item));
      galleryObserver.disconnect();
    };
  }, [images]);

  return (
    <section className="gallery">
      <div className="container">
        <div className="discover">
          <h2>
            Our Visual Journey Through <br />
            <span className="red-color"> Unforgettable Destinations</span>
          </h2>

          <Button
            text="Explore More"
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
        </div>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <div key={index} className={`gallery-item item-${index + 1}`}>
              <img src={img} alt={`Gallery item ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
