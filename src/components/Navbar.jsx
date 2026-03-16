import React, { useState } from "react";
import "./Navbar.css";
import { Bell, Star, User } from "lucide-react";
import logo from "../assets/pes_logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearchKey = (e) => {
  if (e.key === "Enter") {
    const text = search.trim().toLowerCase();

    if (text === "interests") {
      navigate("/interests");
      return;
    }
    if (text === "clubs") {
      navigate("/clubs");
      return;
    }
    if (text === "events") {
      navigate("/events");
      return;
    }
    if (text === "dashboard") {
      navigate("/dashboard");
      return;
    }

    // Default → send to explore with search query
    navigate(`/explore?search=${encodeURIComponent(search)}`);
  }
};


  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="PES Logo" className="nav-logo" />
        <h2 className="nav-title">PES Connect</h2>
      </div>

      <div className="nav-center">
        <input
          type="text"
          className="search-bar"
          placeholder="Search events or clubs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKey}
        />
      </div>

      <div className="nav-right">
        <Bell className="nav-icon" />

        {/* ⭐ Interest button */}
        <Star
          className="nav-icon"
          onClick={() => navigate("/interests")}
          style={{ cursor: "pointer" }}
        />

        <User
          className="nav-icon"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
