import "./SeatSelector.css";

export default function SeatSelector({ seats, selectedSeats, toggleSeat }) {
  const seatArray = Array.from({ length: seats }, (_, i) => i + 1);

  return (
    <div className="rb-seat-grid">
      {seatArray.map((seat) => (
        <div
          key={seat}
          onClick={() => toggleSeat(seat)}
          className={
            selectedSeats.includes(seat)
              ? "rb-seat selected"
              : "rb-seat"
          }
        >
          {seat}
        </div>
      ))}
    </div>
  );
}
