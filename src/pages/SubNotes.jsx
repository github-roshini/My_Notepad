import { useParams, useNavigate } from "react-router-dom";
import React from 'react';
import useDateTime from "../hooks/useDateTime";
import "../components/css/Card.css";
import { useSelector, useDispatch } from "react-redux";
import { addSubNote } from "../slices/notesslice";
import { IoSend } from "react-icons/io5";
import Card from "../components/Modal/Card";
import "../components/css/SubNotes.css";
import { useState } from "react";
import Title from "../components/Modal/Title";
import useWindowWidth from "../hooks/useWindowWidth"; // Import the hook

const SubNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { date, time } = useDateTime();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const currentNote = notes.find((note) => note.id === parseInt(id));
  const width = useWindowWidth();
  const isMobile = width < 768;

  const [subNoteText, setSubNoteText] = useState('');

  if (!currentNote) {
    return <div>Note not found</div>;
  }

  const handleSend = () => {
    if (!subNoteText.trim()) return;
    const newSubNote = {
      text: subNoteText,
      date,
      time,
    };
    dispatch(addSubNote({ id: currentNote.id, subNote: newSubNote }));
    setSubNoteText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="subnotes">
      <div className="header">
      {isMobile && (
        <button onClick={() => navigate(-1)} className="back-button">
          ←
        </button>
      )}
        <div className="header-content"><Title title={currentNote.title} color={currentNote.color} /></div>
      </div>
      <div className="notes-content">
        {currentNote.subNotes.map((subNote, index) => (
          <Card key={index} text={subNote.text} date={subNote.date} time={subNote.time} />
        ))}
      </div>
      <div className="textarea-foot">
        <textarea
          placeholder="Enter your text here..........."
          value={subNoteText}
          onChange={(e) => setSubNoteText(e.target.value)}
          onKeyPress={handleKeyPress}
        ></textarea>
        <button
          className={`send ${subNoteText.trim() ? 'enabled' : ''}`}
          onClick={handleSend}
          disabled={!subNoteText.trim()}
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default SubNotes;