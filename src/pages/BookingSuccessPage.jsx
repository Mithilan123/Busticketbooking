import { Link, useLocation } from "react-router-dom";
import "./BookingSuccess.css";

export default function BookingSuccessPage() {
  const location = useLocation();
  const booking = location.state;

  return (
    <div className="success-wrapper">

      <div className="confetti"></div>

      <div className="success-card animated-pop">
        <div className="success-icon">
          <span>&#10003;</span>
        </div>

        <h1 className="title">Booking Confirmed!</h1>
        <p className="subtitle">Your ticket has been booked successfully.</p>

        <div className="ticket-box animated-fadein">
          <h2>{booking?.busName}</h2>

          <div className="ticket-info">
            <p><strong>From:</strong> {booking?.source}</p>
            <p><strong>To:</strong> {booking?.destination}</p>
            <p><strong>Date:</strong> {booking?.date}</p>
            <p><strong>Seats:</strong> {booking?.seats?.join(", ")}</p>
            <p><strong>Total Fare:</strong> ₹{booking?.fare}</p>
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
