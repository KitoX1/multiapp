import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

import { useState } from 'react';
import { createNote } from '@/shared/store';
import { NotesListAddItemService } from './api';

import styles from './NotesListAddItem.module.scss';

export const NotesListAddItem = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();

  const [loading, setLoading] = useState(false);

  const onClickAdd = async () => {
    try {
      setLoading(true);

      const note = await NotesListAddItemService.addNotesListItem();

      await dispath(createNote(note));
      navigate(`/notes/${note.id}`);
    } catch (error) {
      console.log(error); // @TODO: notification
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button
          onClick={onClickAdd}
          startIcon={<NoteAddOutlinedIcon />}
          className={styles.notesListAddItem}
          variant='outlined'
        >
          Добавить
        </Button>
      )}
    </>
  );
};
