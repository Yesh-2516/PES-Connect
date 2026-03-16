import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Schedule.css";

const Schedule = () => {
  const [viewMode, setViewMode] = useState("calendar");
  const [schedule, setSchedule] = useState([]);

  const userId = "123"; // replace later with real user

  const categoryColors = {
    Workshops: "#6f42c1",
    Recruitments: "#28a745",
    Cultural: "#f9b233",
    Technical: "#007bff",
  };

  // Fetch schedule from backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/schedule/${userId}`)
      .then((res) => res.json())
      .then((data) => setSchedule(data));
  }, []);

  // Remove event
  const removeFromSchedule = async (id) => {
    await fetch(`http://localhost:5000/api/schedule/remove/${id}`, {
      method: "DELETE",
    });

    setSchedule((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="schedule">
      <div className="schedule-header">
        <h2>Schedule</h2>
        <div className="toggle">
          <button
            onClick={() => setViewMode("calendar")}
            style={{
              backgroundColor: viewMode === "calendar" ? "#f9b233" : "#fff",
              color: viewMode === "calendar" ? "white" : "#002855",
            }}
          >
            Calendar
          </button>

          <button
            onClick={() => setViewMode("timeline")}
            style={{
              backgroundColor: viewMode === "timeline" ? "#f9b233" : "#fff",
              color: viewMode === "timeline" ? "white" : "#002855",
            }}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* ---- CALENDAR VIEW ---- */}
      {viewMode === "calendar" ? (
        <div className="calendar-view">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="auto"
            headerToolbar={{
              left: "",
              center: "title",
              right: "prev,next",
            }}
            events={schedule.map((e) => ({
              title: e.title,
              date: e.date,
              color: categoryColors[e.category] || "#007bff",
            }))}
          />

          <div className="legend" style={{color: "#1b5ba3ff"}}>
            <span className="legend-item">
              <span style={{ background: "#007bff" }}></span> Technical
            </span>
            <span className="legend-item">
              <span style={{ background: "#6f42c1" }}></span> Workshops
            </span>
            <span className="legend-item">
              <span style={{ background: "#28a745" }}></span> Recruitments
            </span>
            <span className="legend-item">
              <span style={{ background: "#f9b233" }}></span> Cultural
            </span>
          </div>
        </div>
      ) : (
        /* ---- TIMELINE VIEW ---- */
        <div className="timeline-view">
          {schedule.map((e) => (
            <div className="timeline-card" key={e._id}>
              <div className="timeline-date">
                {new Date(e.date).toDateString()}
              </div>

              <div className="timeline-content">
                <div
                  className="timeline-bar"
                  style={{ background: categoryColors[e.category] }}
                ></div>

                <div>
                  <h3 style={{color: "#1b5ba3ff"}}>{e.title}</h3>
                  <p style={{color: "#1b5ba3ff"}}>{e.category}</p>

                  <button
                    onClick={() => removeFromSchedule(e._id)}
                    className="remove-btn"
                  >
                    Remove from Schedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Schedule;
