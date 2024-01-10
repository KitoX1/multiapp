interface Props {
  date: string;
}

export const NotesListDate = ({ date }: Props) => <h3>{new Date(date).toLocaleDateString()}</h3>;
