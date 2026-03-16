import React, { useEffect, useState } from "react";
import "./Explore.css";
import maaya from "../assets/maaya_banner.png";

const Explore = () => {
  const [category, setCategory] = useState("All"); // Top chips
  const [exploreItems, setExploreItems] = useState([]);

  // Sidebar filters
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Final filtered list shown on screen
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const eventsRes = await fetch("http://localhost:5000/api/events");
        const clubsRes = await fetch("http://localhost:5000/api/clubs");

        const events = await eventsRes.json();
        const clubs = await clubsRes.json();

        const filteredEvents = events.filter((e) => e.category === "Explore");
        const filteredClubs = clubs.filter((c) => c.category === "Explore");

        const combined = [...filteredEvents, ...filteredClubs];

        setExploreItems(combined);
        setFilteredItems(combined);
      } catch (err) {
        console.error("Error loading Explore page:", err);
      }
    };

    loadData();
  }, []);

  // Apply Filters Button Function
  const applyFilters = () => {
    let results = [...exploreItems];

    // Sidebar category filter
    if (filterCategory !== "All") {
      results = results.filter((i) => i.type === filterCategory);
    }

    // Date filter
    if (filterDate) {
      results = results.filter((i) => i.date === filterDate);
    }

    // Top chips filter
    if (category !== "All") {
      results = results.filter((i) => i.type === category);
    }

    setFilteredItems(results);
  };

  return (
    <div className="explore-page-container">

      {/* LEFT MAIN SECTION */}
      <div className="explore-main">

        {/* Banner */}
        <div className="explore-banner">
          <img src={maaya} alt="MAAYA 2025" />
          <button
  className="explore-btn"
  onClick={() => window.open("https://maaya25.netlify.app/", "_blank")}
>
  Explore Now
</button>

        </div>

        {/* Category Chips */}
        <div className="category-chips">
          {["All", "Technical", "Cultural", "Workshop", "Hackathon"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                applyFilters();
              }}
              className={`chip ${category === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ITEMS GRID */}
        <div className="explore-grid">
          {filteredItems.map((item) => (
            <div key={item._id} className="event-card">
              <img src={item.image} alt={item.title || item.name} />
              <div className="event-info">
                <h4>{item.title || item.name}</h4>
                <p>{item.date || item.description}</p>
                <p>{item.type}</p>

                {item.link && (
                  <button
                    className="register-btn"
                    onClick={() => window.open(item.link, "_blank")}
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="explore-sidebar">
        <h3>Filters</h3>

        {/* DATE */}
        <label>Date</label>
        <input
          type="date"
          className="explore-input"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        {/* CATEGORY */}
        <label>Category</label>
        <select
          className="explore-input"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option>All</option>
          <option>Technical</option>
          <option>Cultural</option>
          <option>Workshop</option>
          <option>Hackathon</option>
        </select>

        {/* APPLY FILTER */}
        <button className="explore-filter-btn" onClick={applyFilters}>
          Filter
        </button>

        {/* SIDEBAR CARDS */}
        <div className="sidebar-card">
          <h4>Lost your ID card?</h4>
          <p>Please visit the Student Deck to retrieve.</p>
        </div>

        <div className="sidebar-card">
          <h4>Recruitments</h4>
          <p>Equinox - Astronomy Club</p>
          <p>IEEE - ML Committee</p>
          <p>Terpsichore Dance Crew</p>
        </div>

      </div>

    </div>
  );
};

export default Explore;
