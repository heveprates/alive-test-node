import { z } from 'zod';

export type TimeSeriesDailyResponseDTO = {
  'Time Series (Daily)': {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };
};

export const TimeSeriesDailyResponseSchema = z.object({
  'Time Series (Daily)': z.record(
    z.object({
      '1. open': z.string(),
      '2. high': z.string(),
      '3. low': z.string(),
      '4. close': z.string(),
      '5. volume': z.string(),
    }),
  ),
});
