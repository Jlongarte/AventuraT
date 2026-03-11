import "./Guides.css";
import { useState } from "react";

const guides = [
  {
    id: 1,
    name: "Leo Martinez",
    specialty: "Desert & Wildlife Guide",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
  },
  {
    id: 2,
    name: "Omar Al-Sayed",
    specialty: "Desert Expedition Expert",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula magna vel libero pretium.",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328f5a54",
  },
  {
    id: 3,
    name: "James Walker",
    specialty: "Safari Adventure Guide",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
  {
    id: 4,
    name: "Hassan Rahman",
    specialty: "Cultural & Desert Specialist",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    image: "https://images.unsplash.com/photo-1590086782792-42dd2350140d",
  },
];

const Guides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextGuide = () => {
    setCurrentIndex((prev) => (prev + 1) % guides.length);
  };

  const prevGuide = () => {
    setCurrentIndex((prev) => (prev === 0 ? guides.length - 1 : prev - 1));
  };

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        {/* Imagen principal */}
        <div className="main-image">
          <img
            src={guides[currentIndex].image}
            alt={guides[currentIndex].name}
          />
        </div>

        {/* Información */}
        <div className="guide-info">
          <div className="nav-buttons">
            <button onClick={prevGuide}>←</button>
            <button onClick={nextGuide}>→</button>
          </div>

          <h2>{guides[currentIndex].name}</h2>
          <h4>{guides[currentIndex].specialty}</h4>
          <p>{guides[currentIndex].description}</p>

          {/* Miniaturas */}
          <div className="thumbnails">
            {guides.map((guide, index) => (
              <img
                key={guide.id}
                src={guide.image}
                alt={guide.name}
                className={index === currentIndex ? "active" : ""}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;
