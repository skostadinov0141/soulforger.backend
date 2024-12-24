import { Test, TestingModule } from '@nestjs/testing';
import { AttributeGroupService } from './attribute-group.service';

describe('AttributeGroupService', () => {
  let service: AttributeGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeGroupService],
    }).compile();

    service = module.get<AttributeGroupService>(AttributeGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
