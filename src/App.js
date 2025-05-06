import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import MusicPortfolio from "./musicCard";
import Navbar from "./navbar";
import FeedbackPage from "./feedback";
import AddNewForm from "./addNew";
import VirtualizedList from "./virualization";


function App() {
  return (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<MusicPortfolio />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/add-new" element={<AddNewForm />} />
      <Route path="/virtualizedList" element={<VirtualizedList />} />
    </Routes>
  </Router>
  );
}

export default App;
