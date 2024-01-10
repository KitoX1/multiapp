import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { notesRoutes } from '@packages/shared';

export const NoteBack = () => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<KeyboardBackspaceOutlinedIcon />}
      onClick={() => navigate(notesRoutes.notes)}
    >
      Заметки
    </Button>
  );
};
