import { Test, TestingModule } from '@nestjs/testing';
import { AttributeGroupController } from './attribute-group.controller';
import { AttributeGroupService } from './attribute-group.service';

describe('AttributeGroupController', () => {
  let controller: AttributeGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributeGroupController],
      providers: [AttributeGroupService],
    }).compile();

    controller = module.get<AttributeGroupController>(AttributeGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
