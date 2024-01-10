/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  notes: NotesListItem[];
  isNoteUpdating: boolean;
};

const initialState: SliceState = {
  notes: [],
  isNoteUpdating: false,
};

const notes = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<NotesListItem[]>) => {
      state.notes = action.payload;
    },
    createNote: (state, action: PayloadAction<NotesListItem>) => {
      state.notes = [action.payload, ...state.notes];
    },
    updateNote: (state, action: PayloadAction<NotesListItem>) => {
      state.notes = state.notes.map((note) => (note.id === action.payload.id ? action.payload : note));
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setIsNoteUpdating: (state, action: PayloadAction<boolean>) => {
      state.isNoteUpdating = action.payload;
    },
  },
});

export const { reducer: notesReducer } = notes;

export const { setNotes, createNote, updateNote, deleteNote, setIsNoteUpdating } = notes.actions;
