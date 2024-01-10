import styles from './NotesListItem.module.scss';

interface Props {
  date: string; // format is: "yyyy-mm-dd hh:mm:ss"
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClick: () => void;
}

export const NotesListItem = ({ date, title, description, action, onClick }: Props) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    className={styles.notesListItem__container}
    onClick={onClick}
  >
    <h4 className={styles.notesListItem__title}>{title || 'Новая заметка'}</h4>

    <div className={styles.notesListItem__contentContainer}>
      <p className={styles.notesListItem__date}>{date.split(' ')[1]}</p>

      <p className={styles.notesListItem__description}>{description || 'Нет дополнительного описания'}</p>
    </div>

    <div className={styles.notesListItem__action}>{action}</div>
  </div>
);
