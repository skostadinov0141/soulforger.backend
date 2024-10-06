import { Test, TestingModule } from '@nestjs/testing';
import { FixedNumericValueService } from './fixed-numeric-value.service';

describe('FixedNumericValueService', () => {
  let service: FixedNumericValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixedNumericValueService],
    }).compile();

    service = module.get<FixedNumericValueService>(FixedNumericValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
