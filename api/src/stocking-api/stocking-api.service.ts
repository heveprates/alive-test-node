import { Injectable } from '@nestjs/common';

@Injectable()
export class StockingApiService {
  quote(stockName: string) {
    return {
      name: stockName,
      lastPrice: 50,
      pricedAt: new Date().toISOString(),
    };
  }

  history(from: string, to: string, stockName: string) {
    return {
      name: stockName,
      prices: [
        {
          opening: 33,
          low: 4545,
          high: 67,
          closing: 78,
          pricedAt: new Date(from).toISOString(),
          volume: 90,
        },
        {
          opening: 23,
          low: 343,
          high: 56,
          closing: 24,
          pricedAt: new Date(to).toISOString(),
          volume: 56,
        },
      ],
    };
  }

  gains(purchasedAt: string, purchasedAmount: string, stockName: string) {
    return {
      name: stockName,
      lastPrice: 4555.66,
      priceAtDate: 5000.33,
      purchasedAmount,
      purchasedAt,
      capitalGains: -60,
    };
  }

  compare(stocksToCompare: string[], stockName: string) {
    return {
      lastPrices: [
        {
          name: stockName,
          lastPrice: 356.99,
          pricedAt: new Date().toISOString(),
        },
        ...stocksToCompare.map((stock) => ({
          name: stock,
          lastPrice: 356.99,
          pricedAt: new Date().toISOString(),
        })),
      ],
    };
  }
}
