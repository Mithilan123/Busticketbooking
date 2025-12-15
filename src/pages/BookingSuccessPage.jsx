import { Link, useLocation } from "react-router-dom";
import "./BookingSuccess.css";

export default function BookingSuccessPage() {
  const location = useLocation();
  const booking = location.state;

  return (
    <div className="success-wrapper">

      <div className="confetti"></div>

      <div className="success-card animated-pop">
        <div className="success-header">
          <div className="success-icon">
            <span>&#10003;</span>
          </div>
          <h1 className="title">Booking Confirmed!</h1>
          <p className="subtitle">Your ticket has been booked successfully.</p>
        </div>

        <div className="ticket-box animated-fadein">
          <h2>{booking?.busName || "Bus Ticket"}</h2>

          <div className="ticket-info">
            <p>
              <strong>From</strong>
              <span style={{ textTransform: "capitalize" }}>{booking?.source}</span>
            </p>
            <p>
              <strong>To</strong>
              <span style={{ textTransform: "capitalize" }}>{booking?.destination}</span>
            </p>
            <p>
              <strong>Date</strong>
              {booking?.date}
            </p>
            <p>
              <strong>Seats</strong>
              {Array.isArray(booking?.seats) ? booking.seats.join(", ") : booking?.seats}
            </p>
            <p>
              <strong>Departure</strong>
              {booking?.departureTime || "08:00"}
            </p>
            <p>
              <strong>Arrival</strong>
              {booking?.arrivalTime || "14:00"}
            </p>
            <p style={{ gridColumn: "1 / -1", background: "linear-gradient(135deg, #1976d2, #1565c0)", color: "white", padding: "15px", fontSize: "18px", fontWeight: "700" }}>
              <strong style={{ color: "white" }}>Total Fare</strong>
              <span style={{ float: "right" }}>₹{booking?.fare || booking?.price || 0}</span>
            </p>
          </div>
        </div>

        <div className="buttons">
          <button className="btn print" onClick={() => window.print()}>
            🖨 Print Ticket
          </button>

          <Link to="/bookings">
            <button className="btn view">📄 View My Bookings</button>
          </Link>

          <Link to="/search">
            <button className="btn home">🚌 Book Another Ticket</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
