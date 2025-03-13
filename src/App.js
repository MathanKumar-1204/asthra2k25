import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import AdminPage from "./components/AdminPage";
import Login from "./components/Login";
import RegisteredEvents from "./components/RegisteredEvents";
import EventsPage from "./components/EventsPage";
import Reg from "./components/Reg";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/events-page" element={<EventsPage />} />
        <Route path="/registered" element={<RegisteredEvents />} />
        <Route path="/reg" element={<Reg />} />
      </Routes>
    </Router>
  );
}

export default App;
