declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare type NotesListItem = {
  createdAt: string; // format is: "yyyy-mm-dd hh:mm:ss"
  title: string;
  description: string;
  id: string;
  content: string;
};

declare type SortedNotesList = { [key: string]: NotesListItem[] };
