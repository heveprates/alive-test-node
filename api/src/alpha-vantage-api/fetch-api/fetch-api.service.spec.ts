import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { DeepMocked } from '@golevelup/ts-jest';
import axios from 'axios';

import { FetchApiService } from './fetch-api.service';
import { DataParseService } from '../data-parse/data-parse.service';

describe('FetchApiService', () => {
  let service: FetchApiService;
  let httpService: DeepMocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchApiService,
        DataParseService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: axios.create(),
          },
        },
        {
          provide: 'AlphaVantageAPIKEY',
          useValue: 'demo',
        },
      ],
    }).compile();

    service = module.get<FetchApiService>(FetchApiService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const testCases = [
    {
      quote: 'IBM',
      apiResponse: {
        'Global Quote': {
          '01. symbol': 'GOOG-MOCK',
          '02. open': '124.4700',
          '03. high': '125.4600',
          '04. low': '122.3200',
          '05. price': '123.4400',
          '06. volume': '33907363',
          '07. latest trading day': '2023-10-26',
          '08. previous close': '126.6700',
          '09. change': '-3.2300',
          '10. change percent': '-2.5499%',
        },
      },
      parsed: {
        symbol: 'GOOG-MOCK',
        day: '2023-10-26',
        open: 124.47,
        high: 125.46,
        low: 122.32,
        price: 123.44,
        volume: 33907363,
        close: 126.67,
      },
    },
  ];

  it('should return a promise', () => {
    jest.spyOn(httpService.axiosRef, 'get').mockResolvedValueOnce({
      data: testCases[0].apiResponse,
      headers: {},
      config: { url: '' },
      status: 200,
      statusText: '',
    });
    expect(service.globalQuote(testCases[0].quote)).toBeInstanceOf(Promise);
  });

  it('should return a promise that resolves to an object with the correct keys', async () => {
    jest.spyOn(httpService.axiosRef, 'get').mockResolvedValueOnce({
      data: testCases[0].apiResponse,
      headers: {},
      config: { url: '' },
      status: 200,
      statusText: '',
    });

    const quote = await service.globalQuote(testCases[0].quote);
    const toBe = testCases[0].parsed;
    expect(quote).toBeInstanceOf(Object);
    expect(quote).toHaveProperty('symbol');
    expect(quote.symbol).toBe(toBe.symbol);
    expect(quote).toHaveProperty('day');
    expect(quote.day).toBe(quote.day);
    expect(quote).toHaveProperty('open');
    expect(quote.open).toBe(quote.open);
    expect(quote).toHaveProperty('high');
    expect(quote.high).toBe(quote.high);
    expect(quote).toHaveProperty('low');
    expect(quote.low).toBe(quote.low);
    expect(quote).toHaveProperty('price');
    expect(quote.price).toBe(quote.price);
    expect(quote).toHaveProperty('volume');
    expect(quote.volume).toBe(quote.volume);
    expect(quote).toHaveProperty('close');
    expect(quote.close).toBe(quote.close);
  });
});
