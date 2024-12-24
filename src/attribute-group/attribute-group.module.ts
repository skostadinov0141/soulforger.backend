import { Module } from '@nestjs/common';
import { AttributeGroupService } from './attribute-group.service';
import { AttributeGroupController } from './attribute-group.controller';

@Module({
  controllers: [AttributeGroupController],
  providers: [AttributeGroupService],
})
export class AttributeGroupModule {}
