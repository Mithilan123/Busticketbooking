import { useState, useEffect } from "react";
import API from "../api";
import "./AdminPage.css";

export default function AdminPage() {
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({
    busName: "",
    source: "",
    destination: "",
    date: "",
    totalSeats: 40,
    price: 0,
    departureTime: "08:00",
    arrivalTime: "14:00",
    busType: "AC",
    amenities: []
  });

  const fetchBuses = async () => {
    try {
      const res = await API.get("/admin/bus");
      setBuses(res.data);
    } catch (err) {
      console.error("Error fetching buses:", err);
      alert("Failed to fetch buses");
    }
  };

  const addBus = async () => {
    if (!newBus.busName || !newBus.source || !newBus.destination || !newBus.date) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await API.post("/admin/bus", {
        ...newBus,
        totalSeats: Number(newBus.totalSeats),
        price: Number(newBus.price),
        source: newBus.source.toLowerCase(),
        destination: newBus.destination.toLowerCase()
      });
      setNewBus({
        busName: "",
        source: "",
        destination: "",
        date: "",
        totalSeats: 40,
        price: 0,
        departureTime: "08:00",
        arrivalTime: "14:00",
        busType: "AC",
        amenities: []
      });
      fetchBuses();
      alert("Bus added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add bus");
    }
  };

  const deleteBus = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) {
      return;
    }
    try {
      await API.delete(`/admin/bus/${id}`);
      fetchBuses();
      alert("Bus deleted successfully!");
    } catch (err) {
      alert("Failed to delete bus");
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div className="admin-wrapper">
      <h1>Admin Panel</h1>

      <div className="add-bus-box">
        <h2>Add New Bus</h2>
        <div className="form-grid">
          <input 
            placeholder="Bus Name *" 
            value={newBus.busName}
            onChange={(e) => setNewBus({ ...newBus, busName: e.target.value })} 
          />
          <input 
            placeholder="Source City *" 
            value={newBus.source}
            onChange={(e) => setNewBus({ ...newBus, source: e.target.value })} 
          />
          <input 
            placeholder="Destination City *" 
            value={newBus.destination}
            onChange={(e) => setNewBus({ ...newBus, destination: e.target.value })} 
          />
          <input 
            type="date" 
            value={newBus.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setNewBus({ ...newBus, date: e.target.value })} 
          />
          <input 
            type="number"
            placeholder="Total Seats *" 
            value={newBus.totalSeats}
            onChange={(e) => setNewBus({ ...newBus, totalSeats: e.target.value })} 
          />
          <input 
            type="number"
            placeholder="Price per Seat *" 
            value={newBus.price}
            onChange={(e) => setNewBus({ ...newBus, price: e.target.value })} 
          />
          <input 
            type="time"
            placeholder="Departure Time" 
            value={newBus.departureTime}
            onChange={(e) => setNewBus({ ...newBus, departureTime: e.target.value })} 
          />
          <input 
            type="time"
            placeholder="Arrival Time" 
            value={newBus.arrivalTime}
            onChange={(e) => setNewBus({ ...newBus, arrivalTime: e.target.value })} 
          />
          <select 
            value={newBus.busType}
            onChange={(e) => setNewBus({ ...newBus, busType: e.target.value })} 
          >
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Sleeper">Sleeper</option>
            <option value="Semi-Sleeper">Semi-Sleeper</option>
          </select>
        </div>
        <button onClick={addBus} className="add-bus-btn">Add Bus</button>
      </div>

      <h2>All Buses ({buses.length})</h2>
      <div className="bus-list">
        {buses.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            No buses found. Add a new bus to get started.
          </p>
        ) : (
          buses.map((bus) => (
            <div key={bus._id} className="admin-bus-card">
              <div className="bus-info">
                <h3>{bus.busName}</h3>
                <p><strong>Route:</strong> {bus.source} → {bus.destination}</p>
                <p><strong>Date:</strong> {bus.date}</p>
                <p><strong>Time:</strong> {bus.departureTime || "08:00"} - {bus.arrivalTime || "14:00"}</p>
                <p><strong>Seats:</strong> {bus.totalSeats - (bus.bookedSeats?.length || 0)}/{bus.totalSeats} available</p>
                <p><strong>Price:</strong> ₹{bus.price} per seat</p>
                <p><strong>Type:</strong> {bus.busType || "AC"}</p>
              </div>
              <button onClick={() => deleteBus(bus._id)} className="delete-btn">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
