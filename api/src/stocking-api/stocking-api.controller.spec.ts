import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

import { StockingApiController } from './stocking-api.controller';
import { StockingApiService } from './stocking-api.service';
import { DateInterval } from '../util/date-interval.type';
import { ParamIsInvalidError } from '../util/errors/param-is-invalid.error';

describe('StockingApiController', () => {
  let controller: StockingApiController;
  let stockingApiService: DeepMocked<StockingApiService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockingApiController],
      providers: [
        {
          provide: StockingApiService,
          useValue: createMock<StockingApiService>(),
        },
      ],
    }).compile();
    controller = module.get<StockingApiController>(StockingApiController);
    stockingApiService = module.get(StockingApiService);
  });

  describe('quote', () => {
    it('should return the quote for the given stock name', async () => {
      const stockName = 'AAPL';
      const expectedQuote = {
        name: 'AAPL',
        lastPrice: 166.89,
        pricedAt: '2023-10-26',
      };

      stockingApiService.quote.mockResolvedValue(expectedQuote);

      const result = await controller.quote(stockName);

      expect(result).toEqual(expectedQuote);
      expect(stockingApiService.quote).toHaveBeenCalledWith(stockName);
    });

    it('should throw an error if the stock name is not provided', async () => {
      const stockName = '';

      expect(() => controller.quote(stockName)).toThrow(ParamIsInvalidError);
    });

    it('should throw an error if the stock name is not provided', async () => {
      const stockName = '';

      expect(() => controller.quote(stockName)).toThrow(ParamIsInvalidError);
    });
  });

  describe('history', () => {
    it('should return the stock history for the given date interval and stock name', async () => {
      const from = '2023-10-20';
      const to = '2023-10-24';
      const stockName = 'AAPL';
      const expectedHistory = {
        name: 'AAPL',
        prices: [
          {
            opening: 173.05,
            low: 171.45,
            high: 173.67,
            closing: 173.44,
            pricedAt: '2023-10-24T00:00:00.000Z',
            volume: 43816644,
          },
          {
            opening: 170.91,
            low: 169.93,
            high: 174.01,
            closing: 173,
            pricedAt: '2023-10-23T00:00:00.000Z',
            volume: 55980109,
          },
          {
            opening: 175.31,
            low: 172.64,
            high: 175.42,
            closing: 172.88,
            pricedAt: '2023-10-20T00:00:00.000Z',
            volume: 64244028,
          },
        ],
      };

      stockingApiService.history.mockResolvedValue(expectedHistory);

      const result = await controller.history(from, to, stockName);

      expect(result).toEqual(expectedHistory);
      expect(stockingApiService.history).toHaveBeenCalledWith(
        new DateInterval(new Date(from), new Date(to)),
        stockName,
      );
    });

    it('should throw an error if the date interval is invalid', async () => {
      const from = 'invalid-date';
      const to = '2023-10-26';
      const stockName = 'AAPL';

      expect(() => controller.history(from, to, stockName)).toThrow(
        ParamIsInvalidError,
      );
    });

    it('should throw an error if the stock name is not provided', async () => {
      const from = '2023-10-25';
      const to = '2023-10-26';

      expect(() => controller.history(from, to, '')).toThrow(
        ParamIsInvalidError,
      );
    });
  });

  describe('gains', () => {
    it('should return the gains for the given stock name, purchased amount and purchased date', async () => {
      const stockName = 'AAPL';
      const purchasedAmount = '10';
      const purchasedAt = '2023-10-20';
      const expectedGains = {
        name: stockName,
        lastPrice: 166.89,
        priceAtDate: 199,
        purchasedAmount: 10,
        purchasedAt: new Date(purchasedAt + 'T00:00:00Z'),
        capitalGains: 168.9,
      };

      stockingApiService.gains.mockResolvedValue(expectedGains);

      const result = await controller.gains(
        purchasedAt,
        purchasedAmount,
        stockName,
      );

      expect(result).toEqual(expectedGains);
      expect(stockingApiService.gains).toHaveBeenCalledWith(
        expectedGains.purchasedAt,
        expectedGains.purchasedAmount,
        stockName,
      );
    });

    it('should throw an error if the purchased amount is not an integer', async () => {
      const stockName = 'AAPL';
      const purchasedAmount = '10.5';
      const purchasedAt = '2023-10-20';

      expect(() =>
        controller.gains(purchasedAt, purchasedAmount, stockName),
      ).toThrow(ParamIsInvalidError);
    });

    it('should throw an error if the purchased date is invalid', async () => {
      const stockName = 'AAPL';
      const purchasedAmount = '10';
      const purchasedAt = 'invalid-date';

      expect(() =>
        controller.gains(purchasedAt, purchasedAmount, stockName),
      ).toThrow(ParamIsInvalidError);
    });

    it('should throw an error if the stock name is not provided', async () => {
      const stockName = '';
      const purchasedAmount = '10';
      const purchasedAt = '2023-10-20';

      expect(() =>
        controller.gains(purchasedAt, purchasedAmount, stockName),
      ).toThrow(ParamIsInvalidError);
    });
  });

  describe('compare', () => {
    it('should return the comparison of the given stocks', async () => {
      const stocksToCompare = ['IBM', 'GOOGL', 'TSLA'];
      const stockName = 'AAPL';
      const expectedComparison = {
        lastPrices: [
          {
            name: 'AAPL',
            lastPrice: 166.89,
            pricedAt: '2023-10-26',
          },
          {
            name: 'IBM',
            lastPrice: 2735.03,
            pricedAt: '2023-10-26',
          },
          {
            name: 'GOOGL',
            lastPrice: 2735.03,
            pricedAt: '2023-10-26',
          },
          {
            name: 'TSLA',
            lastPrice: 1167.83,
            pricedAt: '2023-10-26',
          },
        ],
      };

      stockingApiService.compare.mockResolvedValue(expectedComparison);

      const result = await controller.compare(stocksToCompare, stockName);

      expect(result).toEqual(expectedComparison);
      expect(stockingApiService.compare).toHaveBeenCalledWith(
        stocksToCompare,
        stockName,
      );
    });

    it('should throw an error if the stocks to compare are not provided', async () => {
      const stocksToCompare = [];
      const stockName = 'AAPL';

      expect(() => controller.compare(stocksToCompare, stockName)).toThrow(
        ParamIsInvalidError,
      );
    });

    it('should throw an error if the stock name is not provided', async () => {
      const stocksToCompare = ['AAPL', 'GOOGL', 'TSLA'];
      const stockName = '';

      expect(() => controller.compare(stocksToCompare, stockName)).toThrow(
        ParamIsInvalidError,
      );
    });
  });
});
