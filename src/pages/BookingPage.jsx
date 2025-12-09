import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeatSelector from "../components/SeatSelector";
import API from "../api";
import "./BookingPage.css";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    API.get(`/bus/${id}`).then(res => setBus(res.data));
  }, []);

  const toggleSeat = (seat) => {
    if (selected.includes(seat)) {
      setSelected(selected.filter((s) => s !== seat));
    } else {
      setSelected([...selected, seat]);
    }
  };

  const book = async () => {
    const res = await API.post("/book", {
      busId: id,
      seats: selected,
    });

    navigate("/success", { state: res.data });
  };

  return (
    <div className="rb-seat-bg">
      <div className="rb-seat-card">

        <h2>Select Seats</h2>
        <p className="rb-seat-sub">{bus?.busName}</p>

        {bus && (
          <SeatSelector
            seats={bus.totalSeats}
            selectedSeats={selected}
            toggleSeat={toggleSeat}
          />
        )}

        <button className="rb-confirm-btn" onClick={book}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
