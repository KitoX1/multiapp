import { httpClient } from '@/shared/api';

export class NotesListDeleteItemService {
  static async deleteNotesListItem(noteId: string) {
    await httpClient.delete(`/notes/${noteId}`);
  }
}
