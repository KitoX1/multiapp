import { httpClient } from '@/shared/api';

export class NotesListAddItemService {
  static async addNotesListItem() {
    const { data } = await httpClient.post<NotesListItem>('/notes', {
      content: null,
      title: '',
      description: '',
      createdAt: `${new Date().toLocaleDateString('sv')} ${new Date().toLocaleTimeString('sv')}`,
    });

    return data;
  }
}
