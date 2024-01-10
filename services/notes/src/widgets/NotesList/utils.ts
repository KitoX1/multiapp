// createdAt format is: "yyyy-mm-dd hh:mm:ss"

const onlyNumbersRegExp = /[^\d]+/g;

export const sortNotesByDate = (list: NotesListItem[]) => {
  const sortedList: NotesListItem[] = list.sort(
    (currentNote, nextNote) =>
      /* eslint-disable implicit-arrow-linebreak, no-unsafe-optional-chaining */
      +nextNote?.createdAt.replaceAll(onlyNumbersRegExp, '') -
      +currentNote?.createdAt.replaceAll(onlyNumbersRegExp, ''),
    /* eslint-enable implicit-arrow-linebreak, no-unsafe-optional-chaining */
  );

  return sortedList;
};
