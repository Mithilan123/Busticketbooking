import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import SeatSelector from "../components/SeatSelector";
import "./BusDetailsPage.css";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/buses/${id}`)
      .then((res) => {
        setBus(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bus:", err);
        setLoading(false);
      });
  }, [id]);

  const bookSeats = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    try {
      const response = await API.post("/bookings", {
        busId: id,
        seats: selectedSeats,
        date: bus.date,
      });

      alert(`Booking successful! Total: ₹${response.data.totalPrice}`);
      navigate("/bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  if (loading) return <div className="bus-details-wrapper"><h2 style={{ textAlign: "center" }}>Loading...</h2></div>;
  if (!bus) return <div className="bus-details-wrapper"><h2 style={{ textAlign: "center" }}>Bus not found</h2></div>;

  const totalPrice = selectedSeats.length * bus.price;

  return (
    <div className="bus-details-wrapper">
      <div className="bus-card">
        <div className="bus-header">
          <h1>{bus.busName}</h1>
          <span className="bus-type">{bus.busType || "AC"}</span>
        </div>
        
        <div className="route-info">
          <div className="route-detail">
            <div className="time">{bus.departureTime || "08:00"}</div>
            <div className="location">{bus.source}</div>
          </div>
          <div className="route-arrow">→</div>
          <div className="route-detail">
            <div className="time">{bus.arrivalTime || "14:00"}</div>
            <div className="location">{bus.destination}</div>
          </div>
        </div>

        <div className="bus-meta">
          <p><strong>Date:</strong> {bus.date}</p>
          <p><strong>Fare per seat:</strong> ₹{bus.price}</p>
          {bus.amenities && bus.amenities.length > 0 && (
            <div className="amenities">
              <strong>Amenities:</strong>
              {bus.amenities.map((amenity, i) => (
                <span key={i} className="amenity-tag">{amenity}</span>
              ))}
            </div>
          )}
        </div>

        <SeatSelector
          bus={bus}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />

        <div className="booking-summary">
          <div className="summary-row">
            <span>Seats Selected: {selectedSeats.length}</span>
            <span>Total Price: ₹{totalPrice}</span>
          </div>
          <button className="book-btn" onClick={bookSeats} disabled={selectedSeats.length === 0}>
            {selectedSeats.length === 0 ? "Select Seats to Book" : `Book ${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''} - ₹${totalPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
}
