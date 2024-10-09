import "./App.css";
import NotesList from "./src/components/Modal/NotesList";
import Home from "./src/pages/Home";
import CreateNote from "./src/components/Modal/CreateNote";
import SubNotes from "./src/pages/SubNotes";
import React from 'react';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadNotes } from "./src/slices/notesslice";
import useWindowWidth from "./src/hooks/useWindowWidth"; // Import the custom hook

const App = () => {
  const dispatch = useDispatch();
  const width = useWindowWidth();
  const isMobile = width < 768; // Define breakpoint for mobile

  useEffect(() => {
    dispatch(loadNotes()); // Load notes from local storage on app start
  }, [dispatch]);

  const [modal, setModal] = useState(false);

  const closeModal = (e) => {
    if (e.target.className === "overlay") {
      setModal(false);
    }
  };

  return (
    <div onClick={closeModal} className="background">
      {modal && <div className="overlay"></div>}
      <Router>
        {isMobile ? (
          <Routes>
            <Route path="/" element={<NotesList createNotes={() => setModal(true)} />} />
            <Route path="/subnotes/:id" element={<SubNotes />} />
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <div className="desktop-layout">
            <NotesList createNotes={() => setModal(true)} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/subnotes/:id" element={<SubNotes />} />
              {/* Redirect any unknown routes to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        )}
      </Router>
      {modal && <CreateNote setModal={setModal} />}
    </div>
  );
};

export default App;