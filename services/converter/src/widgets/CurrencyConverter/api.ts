import { AxiosResponse } from 'axios';

import { httpClient } from '@/shared/api';

export class CurrencyConvertertService {
  static async getСurrentCurrencyRate(currency: AnyCurrencyValue) {
    type Response = { date: string } & { [key in AnyCurrencyValue]: { [childKey in AnyCurrencyValue]: number } };

    const { data } = await httpClient.get<null, AxiosResponse<Response>>(`/latest/currencies/${currency}.json`);

    return data;
  }
}
