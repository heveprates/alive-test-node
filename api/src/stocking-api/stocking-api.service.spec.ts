import { Test, TestingModule } from '@nestjs/testing';
import { StockingApiService } from './stocking-api.service';

describe('StockingApiService', () => {
  let service: StockingApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockingApiService],
    }).compile();

    service = module.get<StockingApiService>(StockingApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
