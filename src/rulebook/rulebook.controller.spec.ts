import { Test, TestingModule } from '@nestjs/testing';
import { RulebookController } from './rulebook.controller';
import { RulebookService } from './rulebook.service';

describe('RulebookController', () => {
  let controller: RulebookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RulebookController],
      providers: [RulebookService],
    }).compile();

    controller = module.get<RulebookController>(RulebookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
