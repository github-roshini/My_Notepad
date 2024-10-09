import { configureStore } from "@reduxjs/toolkit";
import notesReducer from '../slices/notesslice' 

export const store = configureStore({
    reducer:{
        notes: notesReducer
    }
})