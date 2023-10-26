import { Test, TestingModule } from '@nestjs/testing';
import { DataParseService } from './data-parse.service';

describe('DataParseService', () => {
  let service: DataParseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataParseService],
    }).compile();

    service = module.get<DataParseService>(DataParseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
