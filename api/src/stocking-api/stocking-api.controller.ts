import { Controller, Get, Param, Query } from '@nestjs/common';
import z from 'zod';

import { StockingApiService } from './stocking-api.service';
import { DateInterval } from '../util/date-interval.type';
import { ParamIsInvalidError } from '../util/errors/param-is-invalid.error';

@Controller()
export class StockingApiController {
  constructor(private readonly stockingApiService: StockingApiService) {}

  @Get('stock/:stockName/quote')
  quote(@Param('stockName') stockName: string) {
    try {
      z.string().min(1).parse(stockName);
    } catch {
      throw new ParamIsInvalidError('stockName');
    }

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
      stockName: z.string().min(1),
    });
    let requestData: z.infer<typeof inputSchema>;
    try {
      requestData = inputSchema.parse({
        from,
        to,
        stockName,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ParamIsInvalidError(error.issues[0].path[0] as string);
      }
      throw error;
    }
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
      stockName: z.string().min(1),
    });
    let requestData: z.infer<typeof inputSchema>;
    try {
      requestData = inputSchema.parse({
        purchasedAt,
        purchasedAmount,
        stockName,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ParamIsInvalidError(error.issues[0].path[0] as string);
      }
      throw error;
    }
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
      stocksToCompare: z.array(z.string().min(1)).min(1),
      stockName: z.string().min(1),
    });
    let requestData: z.infer<typeof inputSchema>;
    try {
      requestData = inputSchema.parse({
        stocksToCompare,
        stockName,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ParamIsInvalidError(error.issues[0].path[0] as string);
      }
      throw error;
    }
    return this.stockingApiService.compare(
      requestData.stocksToCompare,
      requestData.stockName,
    );
  }
}
