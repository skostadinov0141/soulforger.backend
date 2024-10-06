import { Test, TestingModule } from '@nestjs/testing';
import { CharacterFieldPathService } from './character-field-path.service';

describe('CharacterFieldPathService', () => {
  let service: CharacterFieldPathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterFieldPathService],
    }).compile();

    service = module.get<CharacterFieldPathService>(CharacterFieldPathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
