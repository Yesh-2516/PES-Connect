import React, { useEffect, useState } from "react";
import "./Clubs.css";

const Clubs = () => {
  const [filters, setFilters] = useState({ Technical: true, Cultural: true });
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clubs")
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch((err) => console.error("Error fetching clubs", err));
  }, []);

  const filteredClubs = clubs
  .filter((club) => club.category === "Club" || club.category === "Explore")
  .filter((club) => filters[club.type]);

  const toggleFilter = (type) => {
    setFilters({ ...filters, [type]: !filters[type] });
  };

  return (
    <div className="clubs-page">
      <div className="clubs-main">
        <h2 className="clubs-title">Club Recruitments</h2>
        <p className="clubs-subtitle">Explore active recruitments across technical and cultural clubs.</p>

        <div className="clubs-grid">
          {filteredClubs.map((club) => (
            <div key={club._id} className="club-card">
              <img src={club.image} alt={club.name} className="club-img" />
              <div className="club-info">
                <h3>{club.name}</h3>
                <p>{club.description}</p>
                <p className="club-type">{club.type}</p>
                <button className="apply-btn" onClick={() => window.open(club.link, "_blank")}>
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="clubs-sidebar">
        <h3>Club Recruitment Filters</h3>

        <label>
          <input
            type="checkbox"
            checked={filters.Technical}
            onChange={() => toggleFilter("Technical")}
          />
          Technical
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.Cultural}
            onChange={() => toggleFilter("Cultural")}
          />
          Cultural
        </label>
      </div>
    </div>
  );
};

export default Clubs;
