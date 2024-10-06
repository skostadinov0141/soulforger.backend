import { Test, TestingModule } from '@nestjs/testing';
import { AttributeTemplateService } from './attribute-template.service';

describe('AttributeTemplateService', () => {
  let service: AttributeTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeTemplateService],
    }).compile();

    service = module.get<AttributeTemplateService>(AttributeTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
