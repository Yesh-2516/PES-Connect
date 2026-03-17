import React from "react";
import "./About.css";
import pesLogo from "../assets/pes_logo_1.png";
import campusBg from "../assets/campus_bg.svg";

const About = () => {
  return (
    <div className="about-container">
      {/* HEADER */}
      <div className="about-header">
        <img src={pesLogo} alt="PES Logo" className="about-logo" />
        <h3>PES UNIVERSITY</h3>
      </div>

      {/* MAIN CONTENT */}
      <div className="about-body">
        <div className="about-text">
          <h1>About</h1>
          <p>
            PES Connect is your all-in-one campus app, designed to make your
            university experience seamless and engaging. It serves as your
            personalized digital gateway to stay updated on college happenings,
            fests, workshops, and recruitment drives — all in one place.
          </p>

          <h3>What You’ll Find</h3>
          <ul>
            <li>
              <b>All College Events & Fests —</b> Stay updated with every
              happening across PES.
            </li>
            <li>
              <b>Hackathons & Competitions —</b> Participate, innovate, and win
              big.
            </li>
            <li>
              <b>Club Recruitments —</b> Apply directly to join active student
              clubs.
            </li>
            <li>
              <b>Schedule Management —</b> Track events, deadlines, and your
              timetable easily.
            </li>
          </ul>
        </div>

        <div className="about-image">
          <img src={campusBg} alt="Campus Illustration" />
        </div>
      </div>
    </div>
  );
};

export default About;
