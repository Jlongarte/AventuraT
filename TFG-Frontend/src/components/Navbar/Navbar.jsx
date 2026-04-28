import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout, favorites, cart } = useAuth();

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setIsOpen(false);
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
    <nav className="nav">
      <NavLink to="/" className="logo-link" onClick={() => setIsOpen(false)}>
        <img
          src="https://res.cloudinary.com/dzo0dufcr/image/upload/v1772454036/logoAventura_qge2md.webp"
          alt="logo"
          className="logo"
        />
      </NavLink>

      {/* --- MENU LINKS --- */}
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        {/* BOTÓN CERRAR (Solo móvil) */}
        <li className="mobile-only close-menu-container">
          <button className="close-menu-btn" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </li>

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

        {/* --- OPCIONES MÓVIL (Logueado) --- */}
        {user && (
          <>
            <hr className="mobile-only divider" />
            <li className="mobile-only">
              <NavLink
                to="/my-bookings"
                className="btn-user"
                onClick={() => setIsOpen(false)}
              >
                <i className="fa-solid fa-passport"></i> My Bookings
              </NavLink>
            </li>
            <li className="mobile-only">
              <button
                onClick={handleLogout}
                className="btn-user logout-mobile-btn"
              >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </li>
          </>
        )}

        {/* --- OPCIONES MÓVIL (No logueado) --- */}
        {!user && (
          <>
            <hr className="mobile-only divider" />
            <li className="mobile-only">
              <NavLink
                to="/login"
                className="btn-user"
                onClick={() => setIsOpen(false)}
              >
                <i className="fa-regular fa-user"></i> Login
              </NavLink>
            </li>
            <li className="mobile-only">
              <NavLink
                to="/register"
                className="btn-user"
                onClick={() => setIsOpen(false)}
              >
                <i className="fa-solid fa-user"></i> Register
              </NavLink>
            </li>
          </>
        )}

        {/* --- ICONOS MÓVIL (Cart/Wishlist) --- */}
        <li className="mobile-only mobile-icons-row">
          <NavLink
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="cart-link"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {cart?.length > 0 && (
              <span className="nav-cart-badge">{cart.length}</span>
            )}
          </NavLink>
          <NavLink
            to="/wishlist"
            onClick={() => setIsOpen(false)}
            className="wishlist-link"
          >
            <i className="fa-regular fa-heart"></i>
            {favorites?.length > 0 && (
              <span className="nav-fav-badge">{favorites.length}</span>
            )}
          </NavLink>
        </li>
      </ul>

      {/* --- ICONOS V. ESCRITORIO --- */}
      <div className="nav-icons-desktop">
        <NavLink to="/cart" className="cart-link">
          <i className="fa-solid fa-cart-shopping"></i>
          {cart?.length > 0 && (
            <span className="nav-cart-badge">{cart.length}</span>
          )}
        </NavLink>
        <NavLink to="/wishlist" className="wishlist-link">
          <i className="fa-regular fa-heart"></i>
          {favorites?.length > 0 && (
            <span className="nav-fav-badge">{favorites.length}</span>
          )}
        </NavLink>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* --- MENÚ ESCRITORIO --- */}
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
                  <NavLink to="/my-bookings" onClick={() => setMenuOpen(false)}>
                    <i className="fa-solid fa-passport"></i> My Bookings
                  </NavLink>
                </li>
                <hr className="dropdown-divider" />
                <li>
                  <button onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
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
