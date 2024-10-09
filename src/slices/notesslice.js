import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      state.notes.push(action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    addSubNote: (state, action) => {
      const { id, subNote } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.subNotes.push(subNote);
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },
    loadNotes: (state) => {
        state.notes = JSON.parse(localStorage.getItem("notes")) || []; // Load from localStorage
      }
  },
});

export const { addToNotes, addSubNote,loadNotes } = notesSlice.actions;
export default notesSlice.reducer;