import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Summary from "./pages/Summary";
import AddMember from "./pages/AddMember";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/add-member" element={<AddMember />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
