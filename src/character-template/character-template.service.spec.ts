import { Test, TestingModule } from '@nestjs/testing';
import { CharacterTemplateService } from './character-template.service';

describe('CharacterTemplateService', () => {
  let service: CharacterTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterTemplateService],
    }).compile();

    service = module.get<CharacterTemplateService>(CharacterTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
