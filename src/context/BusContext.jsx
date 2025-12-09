import { createContext, useState } from "react";

export const BusContext = createContext();

export const BusProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    source: "",
    destination: "",
    date: "",
  });

  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <BusContext.Provider value={{
      searchData,
      setSearchData,
      selectedBus,
      setSelectedBus,
      selectedSeats,
      setSelectedSeats
    }}>
      {children}
    </BusContext.Provider>
  );
};
