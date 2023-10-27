import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosInstance } from 'axios';

import { DateInterval } from 'src/util/date-interval.type';
import { DataParseService } from 'src/alpha-vantage-api/data-parse/data-parse.service';

const ONE_HOUR = 60 * 60 * 1000;
@Injectable()
export class FetchApiService {
  private readonly apiAlphaVantageInstance: AxiosInstance;
  private readonly apiKey: string;

  constructor(
    private readonly dataParseService: DataParseService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = 'LA56I75ZAUEMKQ9Y';
    this.apiAlphaVantageInstance = this.httpService.axiosRef;
    this.apiAlphaVantageInstance.defaults.baseURL =
      'https://www.alphavantage.co/query';
    this.apiAlphaVantageInstance.defaults.params = {
      apikey: this.apiKey,
    };
  }

  async globalQuote(quoteSymbol: string) {
    const resp = await this.apiAlphaVantageInstance.get('', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: quoteSymbol,
      },
    });

    return this.dataParseService.parseGlobalQuote(resp.data);
  }

  async timeSeriesDaily(stockSymbol: string, interval: DateInterval) {
    const resp = await this.apiAlphaVantageInstance.get('', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: stockSymbol,
        outputsize: 'full',
      },
    });

    return this.dataParseService.parseTimeSeriesDaily(resp.data, interval);
  }
}
