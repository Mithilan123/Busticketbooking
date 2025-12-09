import { useEffect, useState, useContext } from "react";
import { BusContext } from "../context/BusContext";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function BusDetailsPage() {
  const { selectedBus, setSelectedBus } = useContext(BusContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/bus/${id}`).then(res => setSelectedBus(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {selectedBus && (
        <>
          <h2>{selectedBus.busName}</h2>
          <p>{selectedBus.source} → {selectedBus.destination}</p>

          <button onClick={() => navigate(`/book/${selectedBus._id}`)}>
            Select Seats
          </button>
        </>
      )}
    </div>
  );
}
