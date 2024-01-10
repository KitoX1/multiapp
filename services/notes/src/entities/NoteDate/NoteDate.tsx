import styles from './NoteDate.module.scss';

interface Props {
  date: string;
}

export const NoteDate = ({ date }: Props) => <h6 className={styles.noteDate}>{date}</h6>;
