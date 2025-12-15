import { Link } from "react-router-dom";
import "./BusCard.css";

export default function BusCard({ bus }) {
  const availableSeats = (bus.totalSeats || 40) - (bus.bookedSeats?.length || 0);
  const seatsAvailable = availableSeats > 0 ? availableSeats : 0;

  return (
    <div className="bus-card">
      <div className="bus-card-header">
        <div className="bus-name-section">
          <h3 className="bus-name">{bus.busName}</h3>
          <span className="bus-type-badge">{bus.busType || "AC"}</span>
        </div>
        <div className="bus-price">
          <span className="price-amount">₹{bus.price}</span>
          <span className="price-label">per seat</span>
        </div>
      </div>

      <div className="bus-route">
        <div className="route-time">
          <div className="time">{bus.departureTime || "08:00"}</div>
          <div className="city">{bus.source}</div>
        </div>
        <div className="route-arrow">→</div>
        <div className="route-time">
          <div className="time">{bus.arrivalTime || "14:00"}</div>
          <div className="city">{bus.destination}</div>
        </div>
      </div>

      <div className="bus-info">
        <div className="info-item">
          <span className="info-label">Date:</span>
          <span className="info-value">{bus.date}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Available Seats:</span>
          <span className={`info-value ${seatsAvailable < 5 ? 'low-seats' : ''}`}>
            {seatsAvailable}
          </span>
        </div>
        {bus.amenities && bus.amenities.length > 0 && (
          <div className="amenities-preview">
            {bus.amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} className="amenity-icon">✓ {amenity}</span>
            ))}
          </div>
        )}
      </div>

      <Link to={`/bus/${bus._id}`}>
        <button className="select-bus-btn">
          Select Seats
        </button>
      </Link>
    </div>
  );
}
