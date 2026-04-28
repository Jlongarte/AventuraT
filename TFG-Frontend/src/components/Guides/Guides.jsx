import "./Guides.css";
import { useState, useEffect } from "react";

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch(
          "https://api-project-jani-and-mat.com/api/general/getGuides",
        );
        const data = await response.json();

        const shuffled = shuffleArray(data.data);
        setGuides(shuffled.slice(0, 5));
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuides();
  }, []);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  if (!guides.length) {
    return <p>Loading guides...</p>;
  }

  const nextGuide = () => {
    setCurrentIndex((prev) => (prev + 1) % guides.length);
  };

  const prevGuide = () => {
    setCurrentIndex((prev) => (prev === 0 ? guides.length - 1 : prev - 1));
  };

  const currentGuide = guides[currentIndex];

  return (
    <div className="carousel-container">
      <h2>Our Guides</h2>
      <div className="carousel-content">
        <div className="main-image">
          <img src={currentGuide.imageUrl} alt={currentGuide.fullName} />
        </div>

        <div className="guide-info">
          <div className="nav-buttons">
            <button onClick={prevGuide}>←</button>
            <button onClick={nextGuide}>→</button>
          </div>

          <h2>{currentGuide.fullName}</h2>
          <p>{currentGuide.description}</p>

          <div className="thumbnails">
            {guides.map((guide, index) => (
              <img
                key={index}
                src={guide.imageUrl}
                alt={guide.fullName}
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
