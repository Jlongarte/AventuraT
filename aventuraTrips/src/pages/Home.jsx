import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import TravelPartners from "../components/Travel_Partners/Travel_Partners";
import AllDestinations from "../components/AllDestinations/AllDestinations";
import ThreeSteps from "../components/ThreeSteps/ThreeSteps";
import Gallery from "../components/Gallery/Gallery";
import Ratings from "../components/Ratings/Ratings";
import Guides from "../components/Guides/Guides";
import Form from "../components/Form/Form";
import Phrase from "../components/Phrase/Phrase";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#form") {
      const el = document.getElementById("form");

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <TravelPartners />
      <AllDestinations
        title="Discover the World's Most Loved"
        subtitle="Travel Destinations"
        limit="9"
      />
      <ThreeSteps />
      <Gallery />
      <Ratings />
      <Guides />
      <Form />
      <Phrase title="Let's Keep the Journey Going" />
    </>
  );
};

export default Home;
