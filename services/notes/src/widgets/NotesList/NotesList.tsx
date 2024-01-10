import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { NotesListDate, NotesListItem } from '@/entities';
import { NotesListSearch, NotesListDeleteItem } from '@/features';
import { getIsNoteUpdatingSelector, getNotesSelector, setNotes } from '@/shared/store';
import { NotesListService } from './api';
import { sortNotesByDate } from './utils';

const deletePortalContainer = document.querySelector('body');

export const NotesList = () => {
  const navigate = useNavigate();

  const dispath = useDispatch();
  const notesList = useSelector(getNotesSelector);
  const isNoteUpdating = useSelector(getIsNoteUpdatingSelector);

  const [filteredNotesList, setFilteredNotesList] = useState<NotesListItem[]>(notesList);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getNotesList = async () => {
    try {
      setLoading(true);

      const notes = await NotesListService.getNotesList();

      const sortedNotesList = sortNotesByDate(notes);

      dispath(setNotes(sortedNotesList));
      setFilteredNotesList(sortedNotesList);
    } catch (error) {
      console.log(error); // @TODO: notification
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const renderList = () => {
    if (searchValue === '' && notesList[0]?.createdAt !== filteredNotesList[0]?.createdAt) {
      setFilteredNotesList(notesList);
      return null;
    }

    let currentDate = '';
    const listToRender: React.ReactNode[] = [];

    filteredNotesList.forEach((note) => {
      const noteDate = note?.createdAt?.split(' ')[0];

      if (currentDate !== noteDate) {
        currentDate = noteDate;

        listToRender.push(
          <NotesListDate
            date={currentDate}
            key={currentDate}
          />,
        );
      }

      listToRender.push(
        <NotesListItem
          onClick={() => navigate(`/notes/${note.id}`)}
          date={note?.createdAt}
          title={note?.title}
          description={note?.description}
          action={
            <NotesListDeleteItem
              noteId={note.id}
              setList={setFilteredNotesList}
              portalContainer={deletePortalContainer}
            />
          }
          key={note.id}
        />,
      );
    });

    return listToRender;
  };

  useEffect(() => {
    if (!notesList.length) getNotesList();
  }, []);

  return (
    <>
      <NotesListSearch
        onChange={setSearchValue}
        list={notesList}
        setList={setFilteredNotesList}
      />

      {loading || isNoteUpdating ? <CircularProgress /> : renderList()}
    </>
  );
};
