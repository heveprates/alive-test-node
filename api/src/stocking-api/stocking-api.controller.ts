import { Controller, Get, Param, Query } from '@nestjs/common';
import { StockingApiService } from './stocking-api.service';

@Controller()
export class StockingApiController {
  constructor(private readonly stockingApiService: StockingApiService) {}

  @Get('stock/:stockName/quote')
  quote(@Param('stockName') stockName: string) {
    return this.stockingApiService.quote(stockName);
  }

  @Get('stocks/:stockName/history')
  history(
    @Query('from') from: string,
    @Query('to') to: string,
    @Param('stockName') stockName: string,
  ) {
    return this.stockingApiService.history(from, to, stockName);
  }

  @Get('stocks/:stockName/gains')
  gains(
    @Query('purchasedAt') purchasedAt: string,
    @Query('purchasedAmount') purchasedAmount: string,
    @Param('stockName') stockName: string,
  ) {
    return this.stockingApiService.gains(
      purchasedAt,
      purchasedAmount,
      stockName,
    );
  }

  @Get('stocks/:stockName/compare')
  compare(
    @Query('stocksToCompare') stocksToCompare: string[],
    @Param('stockName') stockName: string,
  ) {
    return this.stockingApiService.compare(stocksToCompare, stockName);
  }
}
