import { AxiosResponse } from 'axios';

import { httpClient } from '@/shared/api';

export class NotesTextareaService {
  static async getTextareaContent(noteId: string) {
    const { data } = await httpClient.get<null, AxiosResponse<NotesListItem>>(`/notes/${noteId}`);

    return data;
  }

  static async updateTextareaContent(payload: NotesListItem) {
    const { data } = await httpClient.put(`/notes/${payload?.id}`, payload);

    return data;
  }
}
