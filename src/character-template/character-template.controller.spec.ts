import { Test, TestingModule } from '@nestjs/testing';
import { CharacterTemplateController } from './character-template.controller';
import { CharacterTemplateService } from './character-template.service';

describe('CharacterTemplateController', () => {
  let controller: CharacterTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterTemplateController],
      providers: [CharacterTemplateService],
    }).compile();

    controller = module.get<CharacterTemplateController>(CharacterTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
