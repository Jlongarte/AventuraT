import { useEffect, useState } from "react";
import "./GuidesTeam.css";

const GuidesTeam = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGuides = async () => {
      try {
        const response = await fetch(
          "https://api-project-jani-and-mat.com/api/general/getGuides",
        );
        const result = await response.json();

        setGuides(result.data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      } finally {
        setLoading(false);
      }
    };

    getGuides();
  }, []);

  if (loading) {
    return <p className="loading">Loading guides...</p>;
  }

  return (
    <div className="guides-grid">
      {guides.map((guide) => (
        <div key={guide.fullName} className="card">
          <div className="card-inner">
            <div
              className="card-front"
              style={{ backgroundImage: `url(${guide.imageUrl})` }}
            >
              <div className="card-name">{guide.fullName}</div>
            </div>

            <div className="card-back">
              <p>{guide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuidesTeam;
