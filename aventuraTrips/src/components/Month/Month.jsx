import "./Month.css";
import { useParams } from "react-router-dom";
import AllDestinations from "../AllDestinations/AllDestinations";

const Month = () => {
  const { monthName } = useParams();

  const monthMap = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };

  const selectedMonth = monthMap[monthName?.toLowerCase()];

  return (
    <main className="month-results-page">
      <header>
        <h1>Explore {monthName} 2026</h1>
        <p>Handpicked adventures for this time of the year.</p>
      </header>

      <AllDestinations
        filterMonth={selectedMonth}
        monthLabel={monthName}
        showButton={false}
      />
    </main>
  );
};

export default Month;
