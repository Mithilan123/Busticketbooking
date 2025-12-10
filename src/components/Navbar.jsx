import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-container">
      <div className="nav-logo">Blue Bus</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search Buses</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

