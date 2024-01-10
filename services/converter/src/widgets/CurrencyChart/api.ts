import { AxiosResponse } from 'axios';

import { httpClient } from '@/shared/api';

export class CurrencyChartService {
  static async getCurrencyByDate(
    fromCurrency: AnyCurrencyValue,
    toCurrency: AnyCurrencyValue,
    date: string = 'latest',
  ) {
    type Response = { date: string } & {
      [key in AnyCurrencyValue]?: { [childKey in AnyCurrencyValue]: number };
    };

    const { data } = await httpClient.get<null, AxiosResponse<Response>>(`/${date}/currencies/${fromCurrency}.json`);

    return data?.[`${fromCurrency}`]?.[`${toCurrency}`];
  }
}
