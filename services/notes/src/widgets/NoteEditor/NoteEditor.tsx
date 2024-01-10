import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import { Box } from '@mui/material';

import { NoteDate, NoteEditorControls } from '@/entities';
import { getNotesSelector, setIsNoteUpdating, updateNote } from '@/shared/store';
import { NotesTextareaService } from './api';

import styles from './NoteEditor.module.scss';
import 'draft-js/dist/Draft.css';

export const NoteEditor = () => {
  const { noteId } = useParams();

  const dispath = useDispatch();
  const notes = useSelector(getNotesSelector);

  const editorStateRef = useRef<EditorState | null>(null);

  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
  const [date, setDate] = useState<string>('');

  const onEditorChange = (newState: EditorState) => {
    editorStateRef.current = editorState;
    setEditorState(newState);
  };

  const getNote = async () => {
    const currentNote = notes.find((note) => note.id === noteId);

    setDate(currentNote?.createdAt);

    if (currentNote?.content) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(currentNote.content))));
    }
  };

  const saveNote = async () => {
    try {
      const editorContent = convertToRaw(editorStateRef.current.getCurrentContent());

      dispath(setIsNoteUpdating(true));

      const updatedNote = await NotesTextareaService.updateTextareaContent({
        id: noteId,
        createdAt: `${new Date().toLocaleDateString('sv')} ${new Date().toLocaleTimeString('sv')}`,
        title: editorContent?.blocks?.[0]?.text ?? 'Новая заметка',
        description: editorContent?.blocks?.[1]?.text ?? '',
        content: JSON.stringify(editorContent),
      });

      dispath(updateNote(updatedNote));
      dispath(setIsNoteUpdating(false));
    } catch (error) {
      console.log(error); // @TODO: notification
      throw error;
    }
  };

  useEffect(() => {
    getNote();

    return () => {
      if (editorStateRef.current !== null) saveNote();
    };
  }, []);

  return (
    <Box className={styles.noteEditor__container}>
      <NoteDate date={date} />

      <NoteEditorControls>
        <NoteEditorControls.BlockStyle
          editorState={editorState}
          onToggle={(blockType) => setEditorState(RichUtils.toggleBlockType(editorState, blockType))}
        />

        <NoteEditorControls.InlineStyle
          editorState={editorState}
          onToggle={(inlineStyle) => setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))}
        />
      </NoteEditorControls>

      <Box className={styles.noteEditor__editor}>
        <Editor
          editorState={editorState}
          onChange={onEditorChange}
        />
      </Box>
    </Box>
  );
};
