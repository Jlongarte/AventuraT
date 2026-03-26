import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 1. Extraemos 'cart' del contexto junto a los demás datos
  const { user, logout, favorites, cart } = useAuth();

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`nav ${isOpen ? "active" : ""}`}>
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

        {/* ICONO DE CARRITO CON CONTADOR */}
        <li>
          <NavLink
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="cart-link"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {/* 2. Mostramos el numero si hay productos en el carrito */}
            {cart && cart.length > 0 && (
              <span className="nav-cart-badge">{cart.length}</span>
            )}
          </NavLink>
        </li>

        {/* ICONO DE FAVORITOS CON CONTADOR */}
        <li>
          <NavLink
            to="/wishlist"
            onClick={() => setIsOpen(false)}
            className="wishlist-link"
          >
            <i className="fa-regular fa-heart"></i>
            {favorites && favorites.length > 0 && (
              <span className="nav-fav-badge">{favorites.length}</span>
            )}
          </NavLink>
        </li>

        {/* Botones usuario solo visibles en móvil */}
        {!user ? (
          <>
            <li className="btn-user mobile-only">
              <i className="fa-regular fa-user"></i>
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
            </li>
            <li className="btn-user mobile-only">
              <i className="fa-solid fa-user"></i>
              <NavLink to="/register" onClick={() => setIsOpen(false)}>
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <li className="mobile-only">
            <button
              onClick={handleLogout}
              className="btn-user"
              style={{ background: "none", color: "var(--secondary-color)" }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* Botones usuario (Desktop) */}
      <ul className="user-links">
        {!user ? (
          <>
            <li className="btn-user">
              <i className="fa-regular fa-user"></i>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="btn-user">
              <i className="fa-solid fa-user"></i>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        ) : (
          <li className="user-menu-wrapper" ref={menuRef}>
            <button
              className="user-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img src={user.imageUrl} alt="avatar" className="user-avatar" />
              <i
                className={`fa-solid fa-chevron-${menuOpen ? "up" : "down"}`}
              ></i>
            </button>

            {menuOpen && (
              <ul className="user-dropdown">
                <li className="dropdown-header">
                  <span>{user.name}</span>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
