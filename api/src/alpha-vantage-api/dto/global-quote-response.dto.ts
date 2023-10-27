import { z } from 'zod';

export type GlobalQuoteResponseDTO = {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
};

export const GlobalQuoteResponseSchema = z.object({
  'Global Quote': z.object({
    '01. symbol': z.string(),
    '02. open': z.string(),
    '03. high': z.string(),
    '04. low': z.string(),
    '05. price': z.string(),
    '06. volume': z.string(),
    '07. latest trading day': z.string(),
    '08. previous close': z.string(),
    '09. change': z.string(),
    '10. change percent': z.string(),
  }),
});
