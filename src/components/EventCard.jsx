import React from "react";
import "../pages/Explore.css";
import { CalendarPlus, Star } from "lucide-react";

const EventCard = ({ event, onAddToSchedule, onAddToInterests, hideActions = false }) => {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} />

      <div className="event-info">
        <h4>{event.title}</h4>
        <p>{event.date}</p>
        <p>{event.price}</p>

        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="register-btn"
        >
          Register
        </a>

        {/* Hide only on dashboard */}
        {!hideActions && (
          <>
            <button
              className="schedule-btn"
              onClick={() => onAddToSchedule(event)}
            >
              <CalendarPlus size={16} /> + Add to Schedule
            </button>

            <button
              className="interest-btn"
              onClick={() => onAddToInterests(event)}
            >
              <Star size={16} color="#f9b233" /> Add to Interests
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
