import { EditorState } from 'draft-js';
import clsx from 'clsx';

import styles from './NoteEditorControls.module.scss';

interface NoteEditorControlsProps {
  children: React.ReactNode;
}

interface StyleButtonProps {
  onClick?: () => void;
  onToggle?: (style: string) => void;
  active?: boolean;
  className?: string;
  style?: string;
  label: string;
}

interface ControlsProps {
  editorState: EditorState;
  onToggle: (style: string) => void;
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
];

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

export const NoteEditorControls = ({ children }: NoteEditorControlsProps) => (
  <div className={styles.noteEditorControls__container}>{children}</div>
);

const StyleButton = ({ style, onToggle, onClick, active, className, label }: StyleButtonProps) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    onToggle(style || '');
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();

    if (onClick) onClick();
  };

  const elemClassName = clsx(
    styles.noteEditorControls__toolbarButton,
    active && styles.noteEditorControls__toolbarButton__active,
    className,
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      className={elemClassName}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {label}
    </span>
  );
};

NoteEditorControls.BlockStyle = ({ editorState, onToggle }: ControlsProps) => {
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return (
    <div className={styles.noteEditorControls__toolbarControls}>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

NoteEditorControls.InlineStyle = ({ editorState, onToggle }: ControlsProps) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className={styles.noteEditorControls__toolbarControls}>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
