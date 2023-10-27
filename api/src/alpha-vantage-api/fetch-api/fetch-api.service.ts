import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosCacheInstance, setupCache } from 'axios-cache-interceptor';

import { DataParseService } from '../data-parse/data-parse.service';
import {
  TimeSeriesDailyResponseDTO,
  TimeSeriesDailyResponseSchema,
} from '../dto/time-series-daily-response.dto';
import {
  GlobalQuoteResponseDTO,
  GlobalQuoteResponseSchema,
} from '../dto/global-quote-response.dto';
import { DateInterval } from '../../util/date-interval.type';
import { NoDataFoundError } from '../../util/errors/no-data-found.error';

const ONE_HOUR = 60 * 60 * 1000;

@Injectable()
export class FetchApiService {
  private readonly apiAlphaVantageInstance: AxiosCacheInstance;
  private readonly apiKey: string;

  constructor(
    private readonly dataParseService: DataParseService,
    httpService: HttpService,
  ) {
    this.apiKey = 'LA56I75ZAUEMKQ9Y';
    const axiosInstance = httpService.axiosRef;
    axiosInstance.defaults.baseURL = 'https://www.alphavantage.co/query';
    axiosInstance.defaults.params = {
      apikey: this.apiKey,
    };
    this.apiAlphaVantageInstance = setupCache(axiosInstance, {
      ttl: ONE_HOUR,
    });
  }

  async globalQuote(quoteSymbol: string) {
    const resp = await this.apiAlphaVantageInstance.get<GlobalQuoteResponseDTO>(
      '',
      {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: quoteSymbol,
        },
      },
    );

    try {
      GlobalQuoteResponseSchema.parse(resp.data);
    } catch {
      throw new NoDataFoundError();
    }
    return this.dataParseService.parseGlobalQuote(resp.data);
  }

  async timeSeriesDaily(stockSymbol: string, interval: DateInterval) {
    const resp =
      await this.apiAlphaVantageInstance.get<TimeSeriesDailyResponseDTO>('', {
        params: {
          function: 'TIME_SERIES_DAILY',
          symbol: stockSymbol,
          outputsize: 'full',
        },
      });

    try {
      TimeSeriesDailyResponseSchema.parse(resp.data);
    } catch {
      throw new NoDataFoundError();
    }
    return this.dataParseService.parseTimeSeriesDaily(resp.data, interval);
  }
}
