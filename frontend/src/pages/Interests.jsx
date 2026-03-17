import React, { useEffect, useState } from "react";
import "./Interests.css";

const Interests = () => {
  const [interests, setInterests] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/interests/my/${userId}`);
        const data = await res.json();
        console.log("INTERESTS FETCHED:", data); // <-- debug output
        setInterests(data);
      } catch (err) {
        console.error("Error fetching interests:", err);
        setInterests([]); // avoid leaving it undefined
      }
    };

    fetchInterests();
  }, [userId]);

  const removeInterest = async (interestId) => {
    try {
      await fetch(`http://localhost:5000/api/interests/${interestId}`, {
        method: "DELETE",
      });

      setInterests((prev) => prev.filter((item) => item._id !== interestId));
    } catch (err) {
      console.error("Error removing interest:", err);
    }
  };

  const list = Array.isArray(interests) ? interests : [];

  return (
    <div className="interests">
      <h2>⭐ My Interests</h2>
      <p>All the events and club recruitments you’ve saved for later.</p>

      <div className="interests-grid">
        {list.length === 0 ? (
          <p className="empty">You haven’t added any interests yet!</p>
        ) : (
          list.map((i) => {
            const event = i.eventId || {}; // safe fallback

            return (
              <div key={i._id} className="interest-card">
                <img src={event.image || ""} alt={event.title || "Event"} />

                <div className="interest-info">
                  <h4>{event.title || "Untitled"}</h4>
                  <p>{event.type || ""}</p>
                  <p>{event.date || ""}</p>

                  <button onClick={() => removeInterest(i._id)}>Remove</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Interests;
