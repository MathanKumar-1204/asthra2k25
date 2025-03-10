import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Admin from "./components/Admin";
import Login from "./components/Login";
import RegisteredEvents from "./components/RegisteredEvents";
// import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import EventsPage from "./components/EventDeatail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/reg" element={<RegisteredEvents />} />
        <Route path="/zainab" element={<EventsPage />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
