import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Bus Booking</div>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/search">Search Buses</Link>
          <Link to="/bookings">My Bookings</Link>

          {user?.role === "admin" && (
            <Link to="/admin">Admin Panel</Link>
          )}

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}

          {user && (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
