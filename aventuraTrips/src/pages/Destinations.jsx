import { useState } from "react";
import AllDestinations from "../components/AllDestinations/AllDestinations";

const Destinations = () => {
  const [page, setPage] = useState(1);
  const perPage = 9;

  return (
    <>
      <AllDestinations
        title="Discover the World's Most Loved Destinations"
        subtitle="of this Season"
        page={page}
        perPage={perPage}
      />

      <div style={{ textAlign: "center", margin: "2rem" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          ⬅ Prev
        </button>

        <span style={{ margin: "0 1rem" }}>Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * perPage >= 10}
        >
          Next ➡
        </button>
      </div>
    </>
  );
};

export default Destinations;
