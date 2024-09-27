import { Test, TestingModule } from '@nestjs/testing';
import { RulebookService } from './rulebook.service';

describe('RulebookService', () => {
  let service: RulebookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RulebookService],
    }).compile();

    service = module.get<RulebookService>(RulebookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
