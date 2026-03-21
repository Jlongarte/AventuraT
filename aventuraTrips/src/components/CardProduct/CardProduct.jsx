import "./CardProduct.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchTripById = async () => {
      try {
        const res = await fetch(
          "https://api-project-jani-and-mat.com/api/general/getRandomTrips/10",
        );

        if (!res.ok) throw new Error("Error en la API");

        const data = await res.json();

        const trip = data.data.find((t) => t.id === id);

        if (!trip) {
          console.warn("No se encontró el trip con id:", id);
          return;
        }

        const adaptedProduct = {
          title: trip.title,
          location: trip.place,
          price: trip.price,
          description: trip.title,
          images: [trip.imageUrl, trip.imageUrl, trip.imageUrl, trip.imageUrl],
          services: "Hotel + Flight",
          duration: "5 days",
          watchers: 12,
          sold: 30,
          isDiscount: trip.isDiscount,
          discountPercentage: trip.discountPercentage,
        };

        setProduct(adaptedProduct);
        setMainImage(trip.imageUrl);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTripById();
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div className="product-container">
      {/* IZQUIERDA: imágenes */}
      <div className="gallery-product">
        <img className="main-image" src={mainImage} alt={product.title} />
        <div className="thumbnails">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* DERECHA */}
      <div className="details">
        <h1>
          Discover <span className="aventura">{product.location}</span> at your
          own pace
        </h1>

        <div className="price">
          {product.isDiscount ? (
            <>
              <span className="original-price">{product.price}</span>
              <span className="discount">-{product.discountPercentage}%</span>
            </>
          ) : (
            product.price
          )}
        </div>

        <ul className="info">
          <li>
            <strong>Services:</strong> {product.services}
          </li>
          <li>
            <strong>Duration:</strong> {product.duration}
          </li>
        </ul>

        <div className="stats">
          <p>👁 {product.watchers} are watching</p>
          <p>🔥 {product.sold} sold recently</p>
        </div>

        <p className="description">{product.description}</p>
        <button className="second-btn primary">Add to Cart</button>
        <button className="second-btn secondary">Buy It Now</button>
      </div>
    </div>
  );
};

export default CardProduct;
