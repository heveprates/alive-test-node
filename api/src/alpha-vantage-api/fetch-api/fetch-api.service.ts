import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { DataParseService } from '../data-parse/data-parse.service';

@Injectable()
export class FetchApiService {
  private readonly apiAlphaVantageInstance: AxiosInstance;
  private readonly apiKey: string;

  constructor(private readonly dataParseService: DataParseService) {
    this.apiKey = 'WSZ54P2SIZEFQWSS';

    this.apiAlphaVantageInstance = axios.create({
      baseURL: 'https://www.alphavantage.co/query',
      params: {
        apikey: this.apiKey,
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

  async timeSeriesDaily(stockSymbol: string, from: string, to: string) {
    const resp = await this.apiAlphaVantageInstance.get('', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: stockSymbol,
        outputsize: 'full',
      },
    });
    return this.dataParseService.parseTimeSeriesDaily(resp.data, from, to);
  }
}