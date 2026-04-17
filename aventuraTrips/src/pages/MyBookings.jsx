import MyTrips from "../components/MyTrips/MyTrips";

const MyBookings = () => {
  return (
    <div className="page-wrapper" style={{ minHeight: "80vh" }}>
      <header style={{ textAlign: "center", marginTop: "60px" }}>
        <h1>My Bookings ✈️</h1>
        <p style={{ color: "#6b7280" }}>Manage your upcoming adventures</p>
      </header>

      <MyTrips />
    </div>
  );
};

export default MyBookings;
