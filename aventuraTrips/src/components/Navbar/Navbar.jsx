import "./Navbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav">
      <NavLink to="/" className="logo-link">
        <img
          src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454036/logoAventura_qge2md.webp"
          alt="logo"
          className="logo"
        />
      </NavLink>

      {/* Botón hamburguesa */}
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menú principal */}
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/destinations" onClick={() => setIsOpen(false)}>
            All Destinations
          </NavLink>
        </li>
        <li>
          <NavLink to="/dates" onClick={() => setIsOpen(false)}>
            Dates
          </NavLink>
        </li>
        <li>
          <NavLink to="/offers" onClick={() => setIsOpen(false)}>
            Offers
          </NavLink>
        </li>
        <li>
          <NavLink to="/team" onClick={() => setIsOpen(false)}>
            Meet the Team
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-cart-shopping"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" onClick={() => setIsOpen(false)}>
            <i className="fa-regular fa-heart"></i>
          </NavLink>
        </li>
      </ul>

      {/* Botones usuario */}
      <ul className="user-links">
        <li className="btn-user">
          <i className="fa-regular fa-user"></i>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="btn-user">
          <i className="fa-solid fa-user"></i>
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
