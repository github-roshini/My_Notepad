import { useState } from "react";
import React from 'react';
import "../Css/CreateNote.css";
import { useDispatch } from "react-redux";
import { addToNotes } from "../../slices/notesslice";

const CreateNote = ({setModal}) => {
  const [notesTitle, setNotesTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

  const dispatch = useDispatch()

  const handleNoteTitle = () => {
    if (!notesTitle.trim()) {
      alert("Please enter a group name.");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }
    const titleData = {
        id: Date.now(),
        title: notesTitle,
        color: selectedColor,
        subNotes: []
    }
    dispatch(addToNotes(titleData))
    setModal(false)
  }

  return (
    <div className="create-notes modal">
      <h1>Create New group</h1>
      <div className="grp-name">
        <h2>Group Name</h2>
        <input type="text" value={notesTitle} placeholder="Enter group name" onChange={(e)=>setNotesTitle(e.target.value)}/>
      </div>
      <div className="color-choose">
        <h2>Choose color</h2>
        <div className="color">
        {colors.map((color, index) => (
            <div 
              key={index}
              style={{ backgroundColor: color }}
              className={`color-option ${selectedColor === color ? 'selected' : ''}`}
              onClick={() => setSelectedColor(color)}
            ></div>
          ))}
        </div>
      </div>
      <button className="create-btn" onClick={handleNoteTitle}>Create</button>
    </div>
  );
};

export default CreateNote;