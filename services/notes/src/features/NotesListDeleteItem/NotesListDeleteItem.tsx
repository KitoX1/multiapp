import { useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { NotesListPortal } from '@/entities';
import { deleteNote } from '@/shared/store';
import { NotesListDeleteItemService } from './api';

import styles from './NotesListDeleteItem.module.scss';

interface Props {
  noteId: string;
  setList: React.Dispatch<React.SetStateAction<NotesListItem[]>>;
  portalContainer: Element;
}

export const NotesListDeleteItem = ({ noteId, setList, portalContainer }: Props) => {
  const dispath = useDispatch();

  const [showСonfirmation, setShowConfirmation] = useState<boolean>(false);

  const deleteNodesListItem = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    try {
      e.stopPropagation();

      await NotesListDeleteItemService.deleteNotesListItem(noteId);
      dispath(deleteNote(noteId));

      setList((prev) => prev.filter((note) => note.id !== noteId));
    } catch (error) {
      console.log(error); // @TODO: notification
      throw error;
    }
  };

  const onCloseConfirmation = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setShowConfirmation(false);
    e.stopPropagation();
  };

  const onClickDelete = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>) => {
    setShowConfirmation(true);
    e.stopPropagation();
  };

  return (
    <>
      <DeleteOutlineOutlinedIcon
        onClick={onClickDelete}
        className={styles.notesListDeleteItem}
        color='error'
      />

      <NotesListPortal
        open={showСonfirmation}
        onAgree={deleteNodesListItem}
        onClose={onCloseConfirmation}
        container={portalContainer}
      />
    </>
  );
};
