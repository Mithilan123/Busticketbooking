import { useState, useContext } from "react";
import API from "../api";
import "./SearchBusPage.css";

export default function SearchBusPage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!source || !destination || !date) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await API.get(
        `/buses/search?source=${source}&destination=${destination}&date=${date}`
      );
      setBuses(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="search-wrapper">

      <h1 className="search-title">Search Buses</h1>

      {/* Search Form */}
      <div className="search-box animated-search">
        <input
          type="text"
          placeholder="From"
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Loader */}
      {loading && <h2 className="loading">Searching buses...</h2>}

      {/* No results */}
      {!loading && buses.length === 0 && (
        <p className="no-results">No buses found. Try different locations.</p>
      )}

      {/* Results */}
      <div className="bus-results">
        {buses.map((bus) => (
          <div key={bus._id} className="bus-card animated-card">
            <h2 className="bus-name">{bus.busName}</h2>

            <p className="route">
              {bus.source} → {bus.destination}
            </p>

            <p><strong>Date:</strong> {bus.date}</p>
            <p><strong>Seats Available:</strong> {bus.seatsAvailable}</p>
            <p><strong>Fare:</strong> ₹{bus.fare}</p>

            <button className="book-btn">View Seats</button>
          </div>
        ))}
      </div>

    </div>
  );
}
