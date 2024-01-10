import { configureStore } from '@reduxjs/toolkit';

import { notesReducer } from './notesSlice/slice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
