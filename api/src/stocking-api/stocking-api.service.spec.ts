import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

import { StockingApiService } from './stocking-api.service';
import { FetchApiService as AlphaVantageApiService } from '../alpha-vantage-api/fetch-api/fetch-api.service';
import { DateInterval } from '../util/date-interval.type';
import { NoDataFoundError } from '../util/errors/no-data-found.error';
// import { AlphaVantageApiModule } from 'src/alpha-vantage-api/alpha-vantage-api.module';

describe('StockingApiService', () => {
  let service: StockingApiService;
  let alphaVantageApiService: DeepMocked<AlphaVantageApiService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockingApiService,
        {
          provide: AlphaVantageApiService,
          useValue: createMock<AlphaVantageApiService>(),
        },
        // {
        //   provide: AlphaVantageApiService,
        //   useValue: {
        //     globalQuote: jest.fn(),
        //   },
        // },
      ],
    }).compile();
    service = module.get<StockingApiService>(StockingApiService);
    alphaVantageApiService = module.get(AlphaVantageApiService);
  });

  describe('quote', () => {
    it('should return a stock quote', async () => {
      const stockName = 'AAPL';
      const quote = {
        symbol: 'GOOG-MOCK',
        day: '2023-10-26',
        open: 124.47,
        high: 125.46,
        low: 122.32,
        price: 123.44,
        volume: 33907363,
        close: 126.67,
      };
      alphaVantageApiService.globalQuote.mockResolvedValueOnce(quote);

      const result = await service.quote(stockName);

      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stockName,
      );

      expect(result).toEqual({
        name: quote.symbol,
        lastPrice: quote.price,
        pricedAt: quote.day,
      });
    });
  });

  describe('history', () => {
    it('should return the stock history', async () => {
      const stockName = 'AAPL';
      const dateInterval = new DateInterval(
        new Date('2021-01-01'),
        new Date('2021-01-05'),
      );
      const history = [
        {
          date: '2021-01-05',
          open: 131.96,
          high: 131.97,
          low: 126.94,
          close: 128.98,
          volume: 1000000,
        },
        {
          date: '2021-01-04',
          open: 133.52,
          high: 133.61,
          low: 126.76,
          close: 129.41,
          volume: 2000000,
        },
        {
          date: '2021-01-01',
          open: 135.58,
          high: 135.99,
          low: 126.76,
          close: 131.96,
          volume: 3000000,
        },
      ];
      alphaVantageApiService.timeSeriesDaily.mockResolvedValueOnce(history);

      const result = await service.history(dateInterval, stockName);

      expect(alphaVantageApiService.timeSeriesDaily).toHaveBeenCalledWith(
        stockName,
        dateInterval,
      );

      expect(result).toEqual({
        name: stockName,
        prices: [
          {
            opening: 131.96,
            low: 126.94,
            high: 131.97,
            closing: 128.98,
            pricedAt: new Date('2021-01-05').toISOString(),
            volume: 1000000,
          },
          {
            opening: 133.52,
            low: 126.76,
            high: 133.61,
            closing: 129.41,
            pricedAt: new Date('2021-01-04').toISOString(),
            volume: 2000000,
          },
          {
            opening: 135.58,
            low: 126.76,
            high: 135.99,
            closing: 131.96,
            pricedAt: new Date('2021-01-01').toISOString(),
            volume: 3000000,
          },
        ],
      });
    });
  });

  describe('gains', () => {
    const stockName = 'AAPL';
    const purchasedAt = new Date('2023-10-24T00:00:00Z');
    const purchasedAmount = 10;
    const quoteAt = {
      date: '2023-10-24',
      open: 173.05,
      high: 173.67,
      low: 171.45,
      close: 80,
      volume: 43816644,
    };
    const quoteNow = {
      symbol: 'AAPL',
      day: '2023-10-26',
      open: 170.37,
      high: 171.3775,
      low: 165.67,
      price: 100,
      volume: 70625258,
      close: 171.1,
    };

    it('should return the capital gains for a stock', async () => {
      alphaVantageApiService.timeSeriesDaily.mockResolvedValueOnce([quoteAt]);
      alphaVantageApiService.globalQuote.mockResolvedValueOnce(quoteNow);

      const result = await service.gains(
        purchasedAt,
        purchasedAmount,
        stockName,
      );

      expect(alphaVantageApiService.timeSeriesDaily).toHaveBeenCalledWith(
        stockName,
        new DateInterval(purchasedAt, purchasedAt),
      );
      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stockName,
      );
      expect(result).toEqual({
        name: stockName,
        lastPrice: quoteNow.price,
        priceAtDate: quoteAt.close,
        purchasedAmount: 10,
        purchasedAt,
        capitalGains: (100 - 80) * 10,
      });
    });

    it('should throw an error if no data is found for the stock', async () => {
      alphaVantageApiService.timeSeriesDaily.mockResolvedValueOnce([]);

      await expect(
        service.gains(purchasedAt, purchasedAmount, stockName),
      ).rejects.toThrow(NoDataFoundError);
    });
  });

  describe('compare', () => {
    const stockName = 'AAPL';
    const stocksToCompare = ['GOOG', 'IBM'];
    const quote1 = {
      symbol: 'AAPL',
      day: '2023-10-26',
      open: 170.37,
      high: 171.3775,
      low: 165.67,
      price: 166.89,
      volume: 70625258,
      close: 171.1,
    };
    const quote2 = {
      symbol: 'GOOG',
      day: '2023-10-26',
      open: 124.47,
      high: 125.46,
      low: 122.32,
      price: 123.44,
      volume: 33907363,
      close: 126.67,
    };
    const quote3 = {
      symbol: 'IBM',
      day: '2023-10-26',
      open: 142.2,
      high: 144.41,
      low: 141.58,
      price: 143.76,
      volume: 11130170,
      close: 137.08,
    };

    it('should return an array with last prices of all stocks', async () => {
      alphaVantageApiService.globalQuote
        .mockResolvedValueOnce(quote1)
        .mockResolvedValueOnce(quote2)
        .mockResolvedValueOnce(quote3);

      const result = await service.compare(stocksToCompare, stockName);

      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledTimes(3);
      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stockName,
      );
      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stocksToCompare[0],
      );
      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stocksToCompare[1],
      );
      expect(result).toEqual({
        lastPrices: [
          {
            name: 'AAPL',
            lastPrice: 166.89,
            pricedAt: '2023-10-26',
          },
          {
            name: 'GOOG',
            lastPrice: 123.44,
            pricedAt: '2023-10-26',
          },
          {
            name: 'IBM',
            lastPrice: 143.76,
            pricedAt: '2023-10-26',
          },
        ],
      });
    });

    it('should return an array with last prices of all stocks, even if some requests fail', async () => {
      alphaVantageApiService.globalQuote
        .mockResolvedValueOnce(quote1)
        .mockRejectedValueOnce(new Error('Failed to fetch quote'))
        .mockResolvedValueOnce(quote3);

      const result = await service.compare(stocksToCompare, stockName);

      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledTimes(3);
      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stockName,
      );
      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stocksToCompare[0],
      );
      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stocksToCompare[1],
      );
      expect(result).toEqual({
        lastPrices: [
          {
            name: 'AAPL',
            lastPrice: 166.89,
            pricedAt: '2023-10-26',
          },
          {
            name: 'IBM',
            lastPrice: 143.76,
            pricedAt: '2023-10-26',
          },
        ],
      });
    });

    it('should return an empty array if all requests fail', async () => {
      alphaVantageApiService.globalQuote.mockRejectedValue(
        new Error('Failed to fetch quote'),
      );

      const result = await service.compare(stocksToCompare, stockName);

      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledTimes(3);
      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stockName,
      );
      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stocksToCompare[0],
      );
      expect(alphaVantageApiService.globalQuote).toHaveBeenCalledWith(
        stocksToCompare[1],
      );
      expect(result).toEqual({
        lastPrices: [],
      });
    });
  });
});
