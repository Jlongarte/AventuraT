import AllDestinations from "../components/AllDestinations/AllDestinations";

const Offers = () => {
  return (
    <AllDestinations
      apiUrl="https://api-project-jani-and-mat.com/api/general/getDiscountTrips"
      showDiscount={true}
      showButton={false}
    />
  );
};

export default Offers;
