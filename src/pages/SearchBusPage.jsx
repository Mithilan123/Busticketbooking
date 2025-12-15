import { useEffect, useState } from "react";
import API from "../api";
import BusCard from "../components/BusCard";
import "./SearchBusPage.css";

export default function SearchBusPage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    API.get("/buses/locations")
      .then((res) => {
        setSources(res.data.sources || []);
        setDestinations(res.data.destinations || []);
      })
      .catch((err) => {
        console.error("Error fetching locations:", err);
      });
  }, []);

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  const searchBuses = async () => {
    if (!source || !destination || !date) {
      setError("Please fill all fields");
      return;
    }

    if (date < today) {
      setError("Please select a future date");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await API.get(
        `/buses/search?source=${source.toLowerCase()}&destination=${destination.toLowerCase()}&date=${date}`
      );
      setBuses(res.data || []);
      if (res.data.length === 0) {
        setError("No buses found for this route");
      }
    } catch (err) {
      setError("Failed to search buses. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h1 className="search-title">Search Buses</h1>
        <p className="search-subtitle">Find and book your perfect bus journey</p>

        <div className="search-box">
          <div className="search-field">
            <label>From</label>
            <select 
              value={source} 
              onChange={(e) => setSource(e.target.value)}
              className="search-select"
            >
              <option value="">Select Source City</option>
              {sources.map((s, i) => (
                <option key={i} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label>To</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="search-select"
            >
              <option value="">Select Destination City</option>
              {destinations.map((d, i) => (
                <option key={i} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label>Date of Journey</label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="search-date"
            />
          </div>

          <button 
            onClick={searchBuses} 
            className="search-btn"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Buses"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="bus-results">
        {buses.length > 0 && (
          <div className="results-header">
            <h2>{buses.length} Bus{buses.length > 1 ? 'es' : ''} Found</h2>
          </div>
        )}
        {buses.map((bus) => (
          <BusCard key={bus._id} bus={bus} />
        ))}
      </div>
    </div>
  );
}
