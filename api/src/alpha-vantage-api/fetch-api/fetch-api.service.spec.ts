import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { DeepMocked } from '@golevelup/ts-jest';
import axios from 'axios';

import { FetchApiService } from './fetch-api.service';
import { DataParseService } from '../data-parse/data-parse.service';
import { DateInterval } from '../../util/date-interval.type';

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

  it('should fetch a GLOBAL_QUOTE to an object with the correct keys', async () => {
    const quoteSymbol = 'IBM';
    const apiResponse = {
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
    };
    const parsed = {
      symbol: 'GOOG-MOCK',
      day: '2023-10-26',
      open: 124.47,
      high: 125.46,
      low: 122.32,
      price: 123.44,
      volume: 33907363,
      close: 126.67,
    };

    jest.spyOn(httpService.axiosRef, 'get').mockResolvedValueOnce({
      data: apiResponse,
      headers: {},
      config: { url: '' },
      status: 200,
      statusText: '',
    });

    const quote = await service.globalQuote(quoteSymbol);
    expect(quote).toEqual(parsed);
  });

  it('should fetch a TIME_SERIES_DAILY to an array of objects with the correct keys', async () => {
    const stockSymbol = 'IBM';
    const interval = new DateInterval(
      new Date('2023-10-19T00:00:00Z'),
      new Date('2023-10-24T00:00:00Z'),
    );
    const apiResponse = {
      'Meta Data': {
        '1. Information': 'Daily Prices (open, high, low, close) and Volumes',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2023-10-26',
        '4. Output Size': 'Compact',
        '5. Time Zone': 'US/Eastern',
      },
      'Time Series (Daily)': {
        '2023-10-26': {
          '1. open': '142.2000',
          '2. high': '144.4100',
          '3. low': '141.5800',
          '4. close': '143.7600',
          '5. volume': '11130170',
        },
        '2023-10-25': {
          '1. open': '137.5000',
          '2. high': '138.4900',
          '3. low': '136.3300',
          '4. close': '137.0800',
          '5. volume': '6472549',
        },
        '2023-10-24': {
          '1. open': '136.7400',
          '2. high': '137.9800',
          '3. low': '136.0500',
          '4. close': '137.7900',
          '5. volume': '3697975',
        },
        '2023-10-23': {
          '1. open': '136.6300',
          '2. high': '137.6800',
          '3. low': '135.8700',
          '4. close': '136.3800',
          '5. volume': '3457527',
        },
        '2023-10-20': {
          '1. open': '138.1500',
          '2. high': '139.2700',
          '3. low': '137.1200',
          '4. close': '137.1600',
          '5. volume': '4865615',
        },
        '2023-10-19': {
          '1. open': '138.6400',
          '2. high': '139.4050',
          '3. low': '137.9300',
          '4. close': '138.0100',
          '5. volume': '5314159',
        },
        '2023-10-18': {
          '1. open': '140.0000',
          '2. high': '140.4300',
          '3. low': '139.5800',
          '4. close': '139.9700',
          '5. volume': '3329985',
        },
      },
    };

    jest.spyOn(httpService.axiosRef, 'get').mockResolvedValueOnce({
      data: apiResponse,
      headers: {},
      config: { url: '' },
      status: 200,
      statusText: '',
    });

    const timeSeriesDaily = await service.timeSeriesDaily(
      stockSymbol,
      interval,
    );
    const expectedOutput = [
      {
        date: '2023-10-24',
        open: 136.74,
        high: 137.98,
        low: 136.05,
        close: 137.79,
        volume: 3697975,
      },
      {
        date: '2023-10-23',
        open: 136.63,
        high: 137.68,
        low: 135.87,
        close: 136.38,
        volume: 3457527,
      },
      {
        date: '2023-10-20',
        open: 138.15,
        high: 139.27,
        low: 137.12,
        close: 137.16,
        volume: 4865615,
      },
      {
        date: '2023-10-19',
        open: 138.64,
        high: 139.405,
        low: 137.93,
        close: 138.01,
        volume: 5314159,
      },
    ];
    expect(timeSeriesDaily).toBeInstanceOf(Array);
    expect(timeSeriesDaily).toHaveLength(4);
    expect(timeSeriesDaily[0]).toMatchObject(expectedOutput[0]);
    expect(timeSeriesDaily[1]).toMatchObject(expectedOutput[1]);
    expect(timeSeriesDaily[2]).toMatchObject(expectedOutput[2]);
    expect(timeSeriesDaily[3]).toMatchObject(expectedOutput[3]);
  });
});
