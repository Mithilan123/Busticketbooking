import { Link } from "react-router-dom";

export default function BusCard({ bus }) {
  return (
    <div style={{
      padding: 15,
      border: "1px solid #ccc",
      marginBottom: 15,
      borderRadius: 10
    }}>
      <h3>{bus.busName}</h3>
      <p>{bus.source} → {bus.destination}</p>
      <p>Date: {bus.date}</p>
      <p>Time: {bus.departureTime}</p>

      <Link to={`/bus/${bus._id}`}>
        <button>Select</button>
      </Link>
    </div>
  );
}
