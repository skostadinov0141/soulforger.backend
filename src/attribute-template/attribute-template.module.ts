import { Module } from '@nestjs/common';
import { AttributeTemplateService } from './attribute-template.service';
import { AttributeTemplateController } from './attribute-template.controller';

@Module({
  controllers: [AttributeTemplateController],
  providers: [AttributeTemplateService],
})
export class AttributeTemplateModule {}
