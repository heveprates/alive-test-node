// import { Test, TestingModule } from '@nestjs/testing';
import { StockingApiService } from './stocking-api.service';
// import { AlphaVantageApiModule } from 'src/alpha-vantage-api/alpha-vantage-api.module';

describe('StockingApiService', () => {
  let service: StockingApiService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [AlphaVantageApiModule],
    //   providers: [StockingApiService],
    // }).compile();
    // service = module.get<StockingApiService>(StockingApiService);
  });

  it('should be defined', () => {
    expect(service).toBeUndefined();
  });
});
