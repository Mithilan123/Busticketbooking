import { useState, useContext } from "react";
import { BusContext } from "../context/BusContext";
import API from "../api";
import BusCard from "../components/BusCard";
import "./SearchBusPage.css";

export default function SearchBusPage() {
  const { searchData, setSearchData } = useContext(BusContext);
  const [buses, setBuses] = useState([]);

  const search = async () => {
    const res = await API.post("/bus/search", searchData);
    setBuses(res.data);
  };

  return (
    <div className="rb-search-container">

      <div className="rb-search-box">
        <input placeholder="From"
          onChange={(e) => setSearchData({ ...searchData, source: e.target.value })}
        />

        <input placeholder="To"
          onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
        />

        <input type="date"
          onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
        />

        <button onClick={search}>Search Bus</button>
      </div>

      <div className="rb-search-results">
        {buses.map(bus => (
          <BusCard key={bus._id} bus={bus} />
        ))}
      </div>
    </div>
  );
}
