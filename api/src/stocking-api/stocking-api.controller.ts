import { Controller, Get, Param, Query } from '@nestjs/common';
import z from 'zod';

import { StockingApiService } from './stocking-api.service';
import { DateInterval } from '../util/date-interval.type';

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
    const inputSchema = z.object({
      from: z.coerce.date(),
      to: z.coerce.date(),
      stockName: z.string(),
    });
    const requestData = inputSchema.parse({
      from,
      to,
      stockName,
    });
    return this.stockingApiService.history(
      new DateInterval(requestData.from, requestData.to),
      requestData.stockName,
    );
  }

  @Get('stocks/:stockName/gains')
  gains(
    @Query('purchasedAt') purchasedAt: string,
    @Query('purchasedAmount') purchasedAmount: string,
    @Param('stockName') stockName: string,
  ) {
    const inputSchema = z.object({
      purchasedAt: z.coerce.date(),
      purchasedAmount: z.coerce.number().int(),
      stockName: z.string(),
    });
    const requestData = inputSchema.parse({
      purchasedAt,
      purchasedAmount,
      stockName,
    });
    return this.stockingApiService.gains(
      requestData.purchasedAt,
      requestData.purchasedAmount,
      requestData.stockName,
    );
  }

  @Get('stocks/:stockName/compare')
  compare(
    @Query('stocksToCompare') stocksToCompare: string[],
    @Param('stockName') stockName: string,
  ) {
    const inputSchema = z.object({
      stocksToCompare: z.array(z.string()),
      stockName: z.string(),
    });
    const requestData = inputSchema.parse({
      stocksToCompare,
      stockName,
    });
    return this.stockingApiService.compare(
      requestData.stocksToCompare,
      requestData.stockName,
    );
  }
}
