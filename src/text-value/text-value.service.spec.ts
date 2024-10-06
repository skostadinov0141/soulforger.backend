import { Test, TestingModule } from '@nestjs/testing';
import { TextValueService } from './text-value.service';

describe('TextValueService', () => {
  let service: TextValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextValueService],
    }).compile();

    service = module.get<TextValueService>(TextValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
