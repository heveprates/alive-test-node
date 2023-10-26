import { Injectable } from '@nestjs/common';
import { GlobalQuoteResponseDTO } from '../dto/global-quote-response.dto';
import { QuoteDTO } from '../dto/quote.dto';
import { TimeSeriesDailyResponseDTO } from '../dto/time-series-daily-response.dto';
import { SeriesDailyDTO } from '../dto/series-daily.dto';

@Injectable()
export class DataParseService {
  parseGlobalQuote(input: GlobalQuoteResponseDTO): QuoteDTO {
    return {
      symbol: input['Global Quote']['01. symbol'],
      day: input['Global Quote']['07. latest trading day'],
      open: parseFloat(input['Global Quote']['02. open']),
      high: parseFloat(input['Global Quote']['03. high']),
      low: parseFloat(input['Global Quote']['04. low']),
      price: parseFloat(input['Global Quote']['05. price']),
      volume: parseInt(input['Global Quote']['06. volume']),
      close: parseFloat(input['Global Quote']['08. previous close']),
    };
  }

  parseTimeSeriesDaily(
    input: TimeSeriesDailyResponseDTO,
    from: string,
    to: string,
  ): SeriesDailyDTO[] {
    return Object.entries(input['Time Series (Daily)'])
      .filter(([date]) => from <= date && date <= to)
      .map(([date, values]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume']),
      }));
  }
}
