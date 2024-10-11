import { Module } from '@nestjs/common';
import { AttributeTemplateSearchService } from './attribute-template-search.service';

@Module({
  providers: [AttributeTemplateSearchService]
})
export class AttributeTemplateSearchModule {}
