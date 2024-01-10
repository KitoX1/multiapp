import { AxiosResponse } from 'axios';

import { httpClient } from '@/shared/api';

export class NotesListService {
  static async getNotesList() {
    const { data } = await httpClient.get<null, AxiosResponse<NotesListItem[]>>('/notes');

    return data;
  }
}
