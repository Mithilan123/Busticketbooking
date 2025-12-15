import "./SeatSelector.css";

export default function SeatSelector({ bus, selectedSeats, setSelectedSeats }) {
  if (!bus) return null;

  const totalSeats = bus.totalSeats || 0;
  const bookedSeats = bus.bookedSeats || [];

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="seat-container">
      <h3>Select Your Seats</h3>

      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-box available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-box booked"></div>
          <span>Booked</span>
        </div>
      </div>

      <div className="seat-grid">
        {Array.from({ length: totalSeats }, (_, i) => {
          const seatNo = i + 1;
          const isBooked = bookedSeats.includes(seatNo);
          const isSelected = selectedSeats.includes(seatNo);

          return (
            <div
              key={seatNo}
              className={`seat 
                ${isBooked ? "booked" : ""} 
                ${isSelected ? "selected" : ""}
              `}
              onClick={() => toggleSeat(seatNo)}
            >
              {seatNo}
            </div>
          );
        })}
      </div>
    </div>
  );
}
