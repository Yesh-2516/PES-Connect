import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Explore.css";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const userId = localStorage.getItem("userId");

  useEffect(() => {
  fetch("http://localhost:5000/api/events")
    .then((res) => res.json())
    .then((data) => {
      console.log("EVENTS FROM BACKEND:", data); // <-- works now
      setEvents(data); // <-- sets events correctly
    })
    .catch((err) => console.error("Error fetching events:", err));
}, []);


  const validEvents = events.filter(
  (e) => e.category === "Event" || e.category === "Explore"
);

const filtered = category === "All"
  ? validEvents
  : validEvents.filter((e) => e.type === category);

  const localDateStr = (d) =>
    new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

  const selectedDateStr = localDateStr(selectedDate);
  const dayEvents = validEvents.filter((e) => e.date === selectedDateStr);

  const addToInterests = async (event) => {
  try {
    await fetch("http://localhost:5000/api/interests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        eventId: event._id
      }),
    });

    alert(`${event.title} added to interests`);
  } catch (err) {
    console.error("Error adding to interests:", err);
  }
  console.log("Posting to:", "http://localhost:5000/api/interests");
console.log("eventId:", event._id);
console.log("userId:", userId);
const response = await fetch("http://localhost:5000/api/interests", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: String(userId),
    eventId: String(event._id)
  }),
});
const result = await response.json();
console.log("RESULT:", result);
};

const addToSchedule = async (event) => {
  await fetch("http://localhost:5000/api/schedule/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "123",
      event: event
    })
  });
  alert(`${event.title} added to schedule`);
};


  return (
    <div className="events-page">
      <div className="events-content">
        <h2 className="events-title">Events</h2>

        <div className="category-chips">
          {["All", "Technical", "Cultural", "Workshop", "Hackathon"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`chip ${category === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="explore-grid">
          {filtered.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onAddToSchedule={addToSchedule}
              onAddToInterests={addToInterests}
            />
          ))}
        </div>
      </div>

      <div className="events-sidebar">
        <h3>Upcoming Events</h3>

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date }) => {
            const hasEvent = events.some((e) => e.date === localDateStr(date));
            return hasEvent ? <div className="event-dot"></div> : null;
          }}
        />

        <div className="day-events">
          <h4>{selectedDate.toDateString()}</h4>

          {dayEvents.length > 0 ? (
            dayEvents.map((e) => (
              <div key={e._id} className="small-event">
                <img src={e.image} alt={e.title} />
                <div style={{color: "#035cc2ff"}}>
                  <p><strong>{e.title}</strong></p>
                  <p>{e.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-events">No events on this day</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
