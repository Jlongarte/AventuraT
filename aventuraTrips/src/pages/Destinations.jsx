import { useState, useEffect } from "react";
import AllDestinations from "../components/AllDestinations/AllDestinations";

const Destinations = () => {
  const [page, setPage] = useState(1);
  const [allTrips, setAllTrips] = useState([]);
  const perPage = 3;

  const totalPages = Math.ceil(allTrips.length / perPage);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(
          "https://api-project-jani-and-mat.com/api/general/getTrips/1",
        );
        const data = await res.json();
        setAllTrips(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrips();
  }, []);

  const currentTrips = allTrips.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <AllDestinations trips={currentTrips} />

      <div style={{ textAlign: "center", margin: "2rem" }}>
        <button
          className="btn-page"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          ⬅ Prev
        </button>

        <span style={{ margin: "0 1rem" }}>
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="btn-page"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
        >
          Next ➡
        </button>
      </div>
    </>
  );
};

export default Destinations;
