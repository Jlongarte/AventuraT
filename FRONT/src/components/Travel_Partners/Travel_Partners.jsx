import "./Travel_Partners.css";

const images = [
  "https://res.cloudinary.com/dzo0dufcr/image/upload/v1772734156/unnamed__5_-removebg-preview_d1av1f.webp",
  "https://res.cloudinary.com/dzo0dufcr/image/upload/v1772734156/unnamed__4_-removebg-preview_kqf63u.webp",
  "https://res.cloudinary.com/dzo0dufcr/image/upload/v1772734155/unnamed__2_-removebg-preview_g5oqnq.webp",
  "https://res.cloudinary.com/dzo0dufcr/image/upload/v1772734156/unnamed__7_-removebg-preview_jn7crc.webp",
  "https://res.cloudinary.com/dzo0dufcr/image/upload/v1772734156/unnamed__9_-removebg-preview_edocpm.webp",
  "https://res.cloudinary.com/dzo0dufcr/image/upload/v1772734156/unnamed__8_-removebg-preview_yzer8g.webp",
  "https://res.cloudinary.com/dzo0dufcr/image/upload/v1772734155/unnamed__6_-removebg-preview_vhmylf.webp",
  "https://res.cloudinary.com/dzo0dufcr/image/upload/v1772734155/unnamed__3_-removebg-preview_kqeetn.webp",
];

const TravelPartners = () => {
  const loopImages = [...images, ...images]; // duplicamos para loop perfecto

  return (
    <section className="partners">
      <div className="container">
        <h2>Our Partners</h2>
        <div className="partners-track">
          {loopImages.map((img, i) => (
            <div className="partner-item" key={i}>
              <img src={img} alt="travel partner logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelPartners;
