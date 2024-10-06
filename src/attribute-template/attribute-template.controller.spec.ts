import { Test, TestingModule } from '@nestjs/testing';
import { AttributeTemplateController } from './attribute-template.controller';
import { AttributeTemplateService } from './attribute-template.service';

describe('AttributeTemplateController', () => {
  let controller: AttributeTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributeTemplateController],
      providers: [AttributeTemplateService],
    }).compile();

    controller = module.get<AttributeTemplateController>(AttributeTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
