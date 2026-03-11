import "./Phrase.css";

const Phrase = ({ title }) => {
  return (
    <section className="phrase">
      <div className="container">
        <h1 className="final-phrase">{title}</h1>
        <img
          src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454035/correo_1_fszp09.webp"
          alt="icono paper plane"
        />
      </div>
    </section>
  );
};

export default Phrase;
