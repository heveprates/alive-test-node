import { Test, TestingModule } from '@nestjs/testing';
import { FetchApiService } from './fetch-api.service';
import { DataParseService } from '../data-parse/data-parse.service';

describe('FetchApiService', () => {
  let service: FetchApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchApiService, DataParseService],
    }).compile();

    service = module.get<FetchApiService>(FetchApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const testCases = ['IBM', 'AAPL', 'GOOG'];

  it('should return a promise', () => {
    const quoteCases = testCases.map((testCase) =>
      service.globalQuote(testCase),
    );
    expect(quoteCases[0]).toBeInstanceOf(Promise);
    expect(quoteCases[1]).toBeInstanceOf(Promise);
    expect(quoteCases[2]).toBeInstanceOf(Promise);
  });

  it('should return a promise that resolves to an object with the correct keys', async () => {
    const quote = await service.globalQuote(testCases[0]);

    expect(quote).toBeInstanceOf(Object);
    expect(quote).toHaveProperty('symbol');
    expect(quote.symbol).toBeDefined();
    expect(quote).toHaveProperty('day');
    expect(quote.day).toBeDefined();
    expect(quote).toHaveProperty('open');
    expect(quote.open).toBeDefined();
    expect(quote).toHaveProperty('high');
    expect(quote.high).toBeDefined();
    expect(quote).toHaveProperty('low');
    expect(quote.low).toBeDefined();
    expect(quote).toHaveProperty('price');
    expect(quote.price).toBeDefined();
    expect(quote).toHaveProperty('volume');
    expect(quote.volume).toBeDefined();
    expect(quote).toHaveProperty('close');
    expect(quote.close).toBeDefined();
  });
});
