import { Module } from '@nestjs/common';
import { AttributeGroupService } from './attribute-group.service';
import { AttributeGroupController } from './attribute-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttributeGroup,
  AttributeGroupSchema,
} from './entities/attribute-group.entity';
import { RulebookModule } from '../rulebook/rulebook.module';

@Module({
  controllers: [AttributeGroupController],
  providers: [AttributeGroupService],
  imports: [
    MongooseModule.forFeature([
      {
        name: AttributeGroup.name,
        schema: AttributeGroupSchema,
      },
    ]),
    RulebookModule,
  ],
  exports: [AttributeGroupService],
})
export class AttributeGroupModule {}
