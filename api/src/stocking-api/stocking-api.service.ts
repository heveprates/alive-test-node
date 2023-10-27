import { Injectable } from '@nestjs/common';
import { FetchApiService as AlphaVantageApiService } from 'src/alpha-vantage-api/fetch-api/fetch-api.service';

import { DateInterval } from '../util/date-interval.type';
import { NoDataFoundError } from '../util/errors/no-data-found.error';

@Injectable()
export class StockingApiService {
  constructor(
    private readonly alphaVantageApiService: AlphaVantageApiService,
  ) {}

  async quote(stockName: string) {
    const quote = await this.alphaVantageApiService.globalQuote(stockName);
    return {
      name: quote.symbol,
      lastPrice: quote.price,
      pricedAt: quote.day,
    };
  }

  async history(dateInterval: DateInterval, stockName: string) {
    const history = await this.alphaVantageApiService.timeSeriesDaily(
      stockName,
      dateInterval,
    );
    return {
      name: stockName,
      prices: history.map((item) => {
        return {
          opening: item.open,
          low: item.low,
          high: item.high,
          closing: item.close,
          pricedAt: new Date(item.date).toISOString(),
          volume: item.volume,
        };
      }),
    };
  }

  async gains(purchasedAt: Date, purchasedAmount: number, stockName: string) {
    const [quoteAt] = await this.alphaVantageApiService.timeSeriesDaily(
      stockName,
      new DateInterval(purchasedAt, purchasedAt),
    );
    if (quoteAt === undefined) {
      throw new NoDataFoundError();
    }
    const quoteNow = await this.alphaVantageApiService.globalQuote(stockName);
    return {
      name: stockName,
      lastPrice: quoteNow.price,
      priceAtDate: quoteAt.close,
      purchasedAmount,
      purchasedAt,
      capitalGains: (quoteNow.price - quoteAt.close) * purchasedAmount,
    };
  }

  async compare(stocksToCompare: string[], stockName: string) {
    const quotesPromises = [stockName, ...stocksToCompare].map((stock) =>
      this.alphaVantageApiService.globalQuote(stock),
    );
    const quotes = await Promise.allSettled(quotesPromises);

    return {
      lastPrices: quotes
        .map((promise) => {
          if (promise.status !== 'fulfilled') {
            return;
          }
          const quote = promise.value;
          return {
            name: quote.symbol,
            lastPrice: quote.price,
            pricedAt: quote.day,
          };
        })
        .filter((quote) => quote !== undefined),
    };
  }
}
