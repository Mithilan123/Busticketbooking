export default function SeatSelector({ seats, selectedSeats, toggleSeat }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
      {[...Array(seats)].map((_, i) => {
        const seat = i + 1;
        const isSelected = selectedSeats.includes(seat);

        return (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            style={{
              padding: 10,
              background: isSelected ? "green" : "#ddd",
              color: "#000",
              borderRadius: 5
            }}
          >
            {seat}
          </button>
        );
      })}
    </div>
  );
}
