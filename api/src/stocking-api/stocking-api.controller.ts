import { Controller, Get, Param, Query } from '@nestjs/common';
import { StockingApiService } from './stocking-api.service';

@Controller()
export class StockingApiController {
  constructor(private readonly stockingApiService: StockingApiService) {}

  @Get('stock/:stockName/quote')
  quote(@Param('stockName') stockName: string) {
    return {
      name: stockName,
      lastPrice: 50,
      pricedAt: new Date().toISOString(),
    };
  }

  @Get('stocks/:stockName/history')
  history(
    @Query('from') from: string,
    @Query('to') to: string,
    @Param('stockName') stockName: string,
  ) {
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

  @Get('stocks/:stockName/gains')
  gains(
    @Query('purchasedAt') purchasedAt: string,
    @Query('purchasedAmount') purchasedAmount: string,
    @Param('stockName') stockName: string,
  ) {
    return {
      name: stockName,
      lastPrice: 4555.66,
      priceAtDate: 5000.33,
      purchasedAmount,
      purchasedAt,
      capitalGains: -60,
    };
  }

  @Get('stocks/:stockName/compare')
  compare(
    @Query('stocksToCompare') stocksToCompare: string[],
    @Param('stockName') stockName: string,
  ) {
    return {
      lastPrices: [
        {
          name: stockName,
          lastPrice: 356.99,
          pricedAt: '2023-10-25',
        },
        ...stocksToCompare.map((stock) => ({
          name: stock,
          lastPrice: 356.99,
          pricedAt: '2023-10-25',
        })),
      ],
    };
  }
}
