import React from "react";
import "./ClubCard.css";

const ClubCard = ({ club }) => (
  <div className="club-card" style={{ backgroundColor: club.color }}>
    <h3>{club.name}</h3>
    <p>{club.category}</p>
    <button>Apply Now</button>
  </div>
);

export default ClubCard;
