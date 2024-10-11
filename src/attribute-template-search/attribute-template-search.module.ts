import { Module } from '@nestjs/common';
import { AttributeTemplateSearchService } from './attribute-template-search.service';
import { RulebookModule } from '../rulebook/rulebook.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttributeTemplate,
  AttributeTemplateSchema,
} from '../attribute-template/entities/attribute-template.entity';

@Module({
  providers: [AttributeTemplateSearchService],
  imports: [
    MongooseModule.forFeature([
      {
        name: AttributeTemplate.name,
        schema: AttributeTemplateSchema,
      },
    ]),
    RulebookModule,
  ],
  exports: [AttributeTemplateSearchService],
})
export class AttributeTemplateSearchModule {}
