import { useEffect, useState } from "react";
import API from "../api";
import "./MyBookingsPage.css";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/bookings")
      .then((res) => {
        setBookings(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="booking-wrapper">
        <h1>My Bookings</h1>
        <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="booking-wrapper">
      <h1>My Bookings</h1>

      <div className="booking-container">
        {bookings.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "60px 20px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🚌</div>
            <p style={{ fontSize: "20px", color: "#666", marginBottom: "10px" }}>
              No bookings found
            </p>
            <p style={{ fontSize: "16px", color: "#999" }}>
              Start booking your journey now!
            </p>
          </div>
        ) : (
          bookings.map((b, index) => (
            <div className="booking-card" key={b._id} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="booking-card-header">
                <h2>🚌 {b.busName || "Bus"}</h2>
              </div>
              <div className="booking-card-content">
                <div className="booking-details">
                  <div>
                    <p><strong>From</strong> <span style={{ textTransform: "capitalize" }}>{b.source}</span></p>
                    <p><strong>To</strong> <span style={{ textTransform: "capitalize" }}>{b.destination}</span></p>
                  </div>
                  <div>
                    <p><strong>Date</strong> {b.date}</p>
                    <p><strong>Seats</strong> {Array.isArray(b.seats) ? b.seats.join(", ") : b.seats}</p>
                  </div>
                  <div>
                    {b.departureTime && <p><strong>Departure</strong> {b.departureTime}</p>}
                    {b.arrivalTime && <p><strong>Arrival</strong> {b.arrivalTime}</p>}
                  </div>
                  <div>
                    <p style={{ background: "linear-gradient(135deg, #e3f2fd, #bbdefb)", borderLeft: "3px solid #1976d2", fontWeight: "700" }}>
                      <strong style={{ color: "#1976d2" }}>Total Price</strong> 
                      <span style={{ color: "#1976d2", fontSize: "20px", float: "right" }}>₹{b.price || 0}</span>
                    </p>
                    {b.busType && <p><strong>Bus Type</strong> {b.busType}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
