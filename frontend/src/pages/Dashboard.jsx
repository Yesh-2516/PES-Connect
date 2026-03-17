import React from "react";
import EventCard from "../components/EventCard";
import sipping from "../assets/sippingstrokes.png";
import mlhunt from "../assets/ml_hunt.png";
import ctf from "../assets/ctf.png";
import parallax from "../assets/Parallax.png";
import terpsichore from "../assets/Terpsichore.png";
import vegavath from "../assets/Vegavath.png";
import maayaBanner from "../assets/maaya_banner.png";
import "./Dashboard.css";

const Dashboard = () => {
  // Ongoing Events
  const events = [
    {
      id: 1,
      title: "Sipping Strokes",
      date: "Oct 8",
      price: "₹ 8,000",
      image: sipping,
      link: "https://docs.google.com/forms/d/e/1FAIpQLScV-yhGdx0AU906sh6QRneNA8zB4LLdbnnvRB9wD8UECO_Drg/viewform",
    },
    {
      id: 2,
      title: "ML Hunt",
      date: "Oct 11",
      price: "₹ 10,000",
      image: mlhunt,
      link: "https://docs.google.com/forms/d/e/1FAIpQLScn298iR4WFIVQZDabEnY2c2E1QPDZDusGN-LY9xxi6jkPxig/viewform",
    },
    {
      id: 3,
      title: "Capture The Flag",
      date: "Oct 17",
      price: "₹ 20,000",
      image: ctf,
      link: "https://forms.gle/ixfFQwMZTzWGXGVU8",
    },
  ];

  // Club Recruitments (with links)
  const recruitments = [
    {
      id: 1,
      name: "Parallax",
      type: "AR/VR & Game Dev Club",
      image: parallax,
      link: "https://forms.gle/pjjqhUujQeaMy4tZ7",
    },
    {
      id: 2,
      name: "Terpsichore",
      type: "Desi Dance Crew",
      image: terpsichore,
      link: "https://forms.gle/L1ifsERfoH4hnAYo7",
    },
    {
      id: 3,
      name: "Team Vegavath",
      type: "Motorsports & Robotics",
      image: vegavath,
      link: "https://forms.gle/NxsYn9sAY4voF4XZ9",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* LEFT SECTION */}
      <div className="dashboard-main">
        {/* Banner */}
        <div className="dashboard-banner">
          <img src={maayaBanner} alt="Maaya 2025 Banner" className="banner-image" />
          <button
            className="explore-fest-btn"
            onClick={() => window.open("https://maaya25.netlify.app/", "_blank")}
          >
            Explore Fest
          </button>
        </div>

        {/* Ongoing Events */}
        <h2 className="section-title">Ongoing Events</h2>
        <div className="event-list">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              hideActions={true}
            />
          ))}
        </div>

        {/* Club Recruitments */}
<h2 className="section-title">Club Recruitments</h2>
<div className="recruitment-list">
  {recruitments.map((club) => (
    <div key={club.id} className="recruitment-card-large">
      <img src={club.image} alt={club.name} className="recruitment-image" />
      <div className="recruitment-details">
        <h3>{club.name}</h3>
        <p>{club.type}</p>
        <button
          className="apply-btn-dashboard"
          onClick={() => window.open(club.link, "_blank")}
        >
          Apply Now
        </button>
      </div>
    </div>
  ))}
</div>
</div>

      {/* RIGHT SIDEBAR */}
      <div className="dashboard-sidebar">
        <div className="sidebar-section">
          <h3>Today at PES</h3>
          <div className="today-events">
            <div className="today-card">
              <img src={mlhunt} alt="ML Hunt" />
              <div>
                <p className="today-event-title">ML Hunt (MRD Centre)</p>
                <span className="event-status ongoing">Ongoing Event</span>
              </div>
            </div>
            <div className="today-card">
              <img src={ctf} alt="Equinox" />
              <div>
                <p className="today-event-title">Equinox Astronomy Talk – 5 PM</p>
                <span className="event-status upcoming">Upcoming</span>
              </div>
            </div>
            <div className="today-card">
              <img src={terpsichore} alt="Terpsichore" />
              <div>
                <p className="today-event-title">Terpsichore Crew Recruitment</p>
                <span className="event-status new">New Recruitment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>My Schedule</h3>
          <div className="schedule-card">
            <div className="schedule-item">
              <span className="dot technical"></span>
              <p>ML Hunt – Oct 11</p>
            </div>
            <div className="schedule-item">
              <span className="dot cultural"></span>
              <p>Sipping Strokes – Oct 8</p>
            </div>
            <div className="schedule-item">
              <span className="dot hackathon"></span>
              <p>Capture The Flag – Oct 17</p>
            </div>
          </div>
          <button className="view-full-btn" onClick={()=>window.location.href="/schedule"}>View Full Schedule</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
