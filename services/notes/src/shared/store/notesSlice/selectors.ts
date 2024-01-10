import { createSelector } from 'reselect';
import { RootState } from '../store';

export const getNotesSelector = createSelector(
  (store: RootState) => store.notes,
  (notes) => notes.notes,
);

export const getIsNoteUpdatingSelector = createSelector(
  (store: RootState) => store.notes,
  (notes) => notes.isNoteUpdating,
);
