import { useState } from "react";
import AllDestinations from "../components/AllDestinations/AllDestinations";

const Destinations = () => {
  const [page, setPage] = useState(1);
  const [totalInPage, setTotalInPage] = useState(0);
  const perPage = 9;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Scroll suave hacia arriba
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <AllDestinations
        page={page}
        setTotalTrips={setTotalInPage}
        showButton={false}
      />

      <div style={{ textAlign: "center", margin: "2rem" }}>
        <button
          className="btn-page"
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          ⬅ Prev
        </button>

        <span style={{ margin: "0 1rem", fontWeight: "bold" }}>
          Page {page}
        </span>

        <button
          className="btn-page"
          onClick={() => handlePageChange(page + 1)}
          disabled={totalInPage < perPage}
        >
          Next ➡
        </button>
      </div>
    </>
  );
};

export default Destinations;
