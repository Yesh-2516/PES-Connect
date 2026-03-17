import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import Explore from "./pages/Explore.jsx";
import Events from "./pages/Events.jsx";
import Schedule from "./pages/Schedule.jsx";
import Clubs from "./pages/Clubs.jsx";
import Interests from "./pages/Interests.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";


function App() {
  return (
    <Router>
  <Routes>

    {/* Public routes (NO layout) */}
    <Route path="/login" element={<Login />} />
    <Route path="/about" element={<About />} />

    {/* Redirect root → login */}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* All other routes WITH sidebar + navbar */}
    <Route
      path="/*"
      element={
        <AppLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/events" element={<Events />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/interests" element={<Interests />} />
          </Routes>
        </AppLayout>
      }
    />

  </Routes>
</Router>

  );
}

export default App;
