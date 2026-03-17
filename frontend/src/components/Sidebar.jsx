import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { Home, Compass, Calendar, Users, Star, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-menu">

        <NavLink to="/dashboard" className="nav-item">
          <Home size={18} /> Dashboard
        </NavLink>

        <NavLink to="/explore" className="nav-item">
          <Compass size={18} /> Explore
        </NavLink>

        <NavLink to="/events" className="nav-item">
          <Calendar size={18} /> Events
        </NavLink>

        <NavLink to="/schedule" className="nav-item">
          <Calendar size={18} /> Schedule
        </NavLink>

        <p className="sidebar-section-title">OTHERS</p>

        <NavLink to="/clubs" className="nav-item">
          <Users size={18} /> Recruitments
        </NavLink>

        <NavLink to="/interests" className="nav-item">
          <Star size={18} /> Interests
        </NavLink>
      </div>

      <div className="logout-section">
        <div className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
