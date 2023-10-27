import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { setup } from 'axios-cache-adapter';
import { DataParseService } from '../data-parse/data-parse.service';
import { DateInterval } from 'src/util/date-interval.type';

const ONE_HOUR = 60 * 60 * 1000;
@Injectable()
export class FetchApiService {
  private readonly apiAlphaVantageInstance: AxiosInstance;
  private readonly apiKey: string;

  constructor(private readonly dataParseService: DataParseService) {
    this.apiKey = 'VAD3LM6A67L2PDYG';

    this.apiAlphaVantageInstance = setup({
      baseURL: 'https://www.alphavantage.co/query',
      params: {
        apikey: this.apiKey,
      },
      cache: {
        maxAge: ONE_HOUR,
        exclude: {
          query: false,
        },
      },
    });
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
