import { useEffect, useState } from "react";
import API from "../api";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings/mine").then(res => setBookings(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Bookings</h2>

      {bookings.map(book => (
        <div key={book._id} style={{ marginBottom: 10 }}>
          <p>Bus: {book.busName}</p>
          <p>Seats: {book.seats.join(", ")}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
