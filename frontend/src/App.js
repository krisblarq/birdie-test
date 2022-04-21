import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ObservationTable from "./ObservationTable";
import tw, { styled } from "twin.macro";

const url = "http://localhost:3306/events";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const events = await response.json();
      setLoading(false);
      setEvents(events);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <ObservationTable />
    </div>
  );
};

export default App;
