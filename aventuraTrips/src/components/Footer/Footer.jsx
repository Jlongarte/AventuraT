import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <article>
        <img
          src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454036/logoAventura_qge2md.webp"
          alt="Aventura Logo"
          className="logo-scale"
        />

        <ul>
          <li>
            <Link to="/about" className="footer-link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/legal" className="footer-link">
              Legal Notice
            </Link>
          </li>
          <li>
            <Link to="/terms" className="footer-link">
              Terms and Conditions
            </Link>
          </li>
          <li>
            <Link to="/cookies" className="footer-link">
              Cookies Policy
            </Link>
          </li>
        </ul>
      </article>

      <article>
        <div>
          <h4>Download our APP</h4>
          <ul>
            <li>
              <img
                className="app"
                src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454791/android_1_anptgf.webp"
                alt="logo android"
              />
              Android App
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454791/apple_1_dox3xf.webp"
                className="app"
                alt="logo apple"
              />
              iOS App
            </li>
          </ul>
        </div>
        <div>
          <h4>Socials</h4>
          <div className="socials">
            <img
              src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454796/facebook_1_fvui6h.webp"
              alt="social logo"
            />
            <img
              src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454796/instagram_1_p2cojy.webp"
              alt="social logo"
            />
            <img
              src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454794/logotipos_1_jdavqz.webp"
              alt="social logo"
            />
          </div>
        </div>
      </article>

      <article>
        <h4>Our Ratings</h4>
        <div className="valoraciones">
          <div className="valoracion">
            <span className="strong">4,5</span> ⭐⭐⭐⭐⭐
          </div>
          <p>
            +2.347 <strong>opinions</strong>
          </p>
        </div>
        <h4>Payment Methods</h4>
        <div className="payment">
          <img
            src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454791/amex_x5oebc.webp"
            alt="payment icon"
          />
          <img
            src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454791/applepay_nsruv8.webp"
            alt="payment icon"
          />
          <img
            src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454790/diners_t0mobo.webp"
            alt="payment icon"
          />
          <img
            src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454790/klarna_kkscoa.webp"
            alt="payment icon"
          />
          <img
            src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454795/paypal_qfnu5x.webp"
            alt="payment icon"
          />
          <img
            src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454792/paywithgoogle_esamgl.webp"
            alt="payment icon"
          />
          <img
            src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454793/visa_r3xvyi.webp"
            alt="payment icon"
          />
          <img
            src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454795/mc_tgnpkb.webp"
            alt="payment icon"
          />
        </div>
      </article>

      <article>
        <div className="work">
          <h4>
            Work with <br /> <span className="red-color">Mateo Tascón</span>
          </h4>
          <h6>{`{ Back End Developer }`}</h6>
        </div>
        <ul className="center">
          <li>
            <a
              href="https://mateotasconportfolio.netlify.app/"
              target="_blank"
              className="footer-link"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="https://cv-mateo.vercel.app/"
              target="_blank"
              className="footer-link"
              rel="noreferrer"
            >
              CV
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/mateo-tascon-gomez/"
              target="_blank"
              className="footer-link"
              rel="noreferrer"
            >
              Linkedin
            </a>
          </li>
          <li>
            <a
              href="https://github.com/matascon"
              target="_blank"
              className="footer-link"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="mailto:tascon1010100@gmail.com"
              target="_blank"
              className="footer-link"
              rel="noreferrer"
            >
              Email me
            </a>
          </li>
        </ul>
      </article>

      <article>
        <div className="work">
          <h4>
            Work with
            <br />
            <span className="red-color"> Janire Garayoa</span>
          </h4>
          <h6>{`{ Front End Developer }`}</h6>
        </div>
        <ul className="center">
          <li>
            <a
              href="https://janire-personal-portfolio.netlify.app/"
              target="_blank"
              className="footer-link"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/janire-gonzalez-garayoa"
              target="_blank"
              className="footer-link"
              rel="noreferrer"
            >
              CV
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/janire-gonzalez-garayoa"
              target="_blank"
              className="footer-link"
              rel="noreferrer"
            >
              Linkedin
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Jlongarte"
              target="_blank"
              className="footer-link"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="mailto:janire.garayoa@gmail.com"
              target="_blank"
              className="footer-link"
              rel="noreferrer"
            >
              Email me
            </a>
          </li>
        </ul>
      </article>
    </footer>
  );
};

export default Footer;
