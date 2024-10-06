import { Test, TestingModule } from '@nestjs/testing';
import { CalculatedNumericValueService } from './calculated-numeric-value.service';

describe('CalculatedNumericValueService', () => {
  let service: CalculatedNumericValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatedNumericValueService],
    }).compile();

    service = module.get<CalculatedNumericValueService>(CalculatedNumericValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
