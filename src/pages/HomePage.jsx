import "./HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-wrapper">
      <div className="home-banner">

        <h1 className="home-title">Welcome to Bus Booking</h1>

        <p className="home-subtitle">
          Your trusted platform to book bus tickets quickly, safely, and comfortably.
        </p>

        <p className="home-desc">
          Compare fares, check seat availability, select your preferred seat, and enjoy 
          a seamless bus ticket booking experience. We connect you with top bus operators 
          across the country to ensure you travel with comfort and confidence.
        </p>

        <Link to="/search">
          <button className="home-search-btn">Search Buses</button>
        </Link>

        <div className="home-features">
          <div className="feat-card">
            <h3>✔ Fast Booking</h3>
            <p>Book your journey in just a few steps with a smooth interface.</p>
          </div>

          <div className="feat-card">
            <h3>✔ Safe Operators</h3>
            <p>Travel with verified, experienced, and reliable bus operators.</p>
          </div>

          <div className="feat-card">
            <h3>✔ Live Tracking</h3>
            <p>Know your bus location in real-time for a stress-free journey.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
