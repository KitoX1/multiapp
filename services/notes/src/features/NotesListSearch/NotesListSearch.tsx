import Input from '@mui/material/Input';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { debounce } from '@mui/material';
import { useCallback, useState } from 'react';
import styles from './NotesListSearch.module.scss';

interface Props {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  list: NotesListItem[];
  setList: React.Dispatch<React.SetStateAction<NotesListItem[]>>;
}

export const NotesListSearch = ({ onChange, list, setList }: Props) => {
  const [uiSearchValue, setUiSearchValue] = useState<string>('');

  const updateNotesList = useCallback(
    debounce((newValue: string) => {
      onChange(newValue);
      setList(list.filter((note) => note.title.search(newValue) > -1 || note.description.search(newValue) > -1));
    }, 200),
    [list],
  );

  return (
    <Input
      value={uiSearchValue}
      onChange={({ target }) => {
        updateNotesList(target.value);
        setUiSearchValue(target.value);
      }}
      placeholder='Поиск'
      startAdornment={<SearchOutlinedIcon />}
      className={styles.notesListSearch}
    />
  );
};
