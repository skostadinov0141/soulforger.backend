import { Test, TestingModule } from '@nestjs/testing';
import { AttributeTemplateSearchService } from './attribute-template-search.service';

describe('AttributeTemplateSearchService', () => {
  let service: AttributeTemplateSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeTemplateSearchService],
    }).compile();

    service = module.get<AttributeTemplateSearchService>(AttributeTemplateSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
