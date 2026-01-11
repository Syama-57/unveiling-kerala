// src/App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Districts from "./pages/Districts";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Submit from "./pages/SubmitContent";
import Myths from "./pages/Myths";
import StoryDetails from "./pages/StoryDetails";
import DistrictDetails from "./pages/DistrictDetails";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserDashboard from "./pages/UserDashboard";
import EditStory from "./pages/EditStory";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <>
      {showLanding && <Landing onFinish={() => setShowLanding(false)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/districts" element={<Districts />} />
        <Route path="/districts/:district" element={<DistrictDetails />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/edit/:id" element={<EditStory />} />
        {/* ✅ Myths page */}
        <Route path="/myth" element={<Myths />} />

        {/* ✅ Story details */}
        <Route path="/story/:slug" element={<StoryDetails />} />

        {/* ✅ Protected submit */}
        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <Submit />
            </ProtectedRoute>
          }
          
        />
      </Routes>
    </>
  );
}
