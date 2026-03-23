import "./CardProduct.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripById = async () => {
      try {
        setLoading(true);

        const url = `https://api-project-jani-and-mat.com/api/general/getTrip/${id}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}: No encontrado`);

        const json = await res.json();
        const trip = json.data;

        if (trip) {
          setProduct({
            title: trip.title,
            location: trip.place,
            price: trip.price,
            description: trip.description,
            images:
              trip.imageUrls && trip.imageUrls.length > 0
                ? trip.imageUrls
                : [trip.imageUrl],
            services: "Hotel + Flight",
            duration: "5 days",
            watchers: trip.watching || 0,
            sold: trip.sold || 0,
            isDiscount: trip.isDiscount,
            discountPercentage: trip.discountPercentage,
          });

          // Seteamos la imagen inicial
          setMainImage(
            trip.imageUrls && trip.imageUrls.length > 0
              ? trip.imageUrls[0]
              : trip.imageUrl,
          );
        }
      } catch (error) {
        console.error("Error en el fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTripById();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading trip details...</div>;
  }

  if (!product) {
    return <div className="error">Trip not found.</div>;
  }

  return (
    <div className="product-container">
      <div className="gallery-product">
        <div className="main-image-wrapper">
          <img className="main-image" src={mainImage} alt={product.title} />
        </div>
        <div className="thumbnails">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Vista ${index + 1}`}
              className={mainImage === img ? "active-thumb" : ""}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="details">
        <h1>
          Discover <span className="aventura">{product.location}</span> at your
          own pace
        </h1>

        <div className="price-section">
          {product.isDiscount ? (
            <div className="price-container">
              <span className="original-price">{product.price}</span>
              <span className="discount-tag">
                -{product.discountPercentage}% OFF
              </span>
            </div>
          ) : (
            <span className="price-tag">{product.price}</span>
          )}
        </div>

        <div className="stats-pills">
          <span>👁️ {product.watchers} people are watching</span>
          <span>🔥 {product.sold} sold recently</span>
        </div>

        <div className="info-box">
          <p>
            <strong>Services:</strong> {product.services}
          </p>
          <p>
            <strong>Duration:</strong> {product.duration}
          </p>
        </div>

        <div className="description-section">
          <h3>About this trip</h3>
          <p className="description">{product.description}</p>
        </div>

        <div className="actions">
          <button className="second-btn">Add to Cart</button>
          <button className="second-btn">Buy It Now</button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
