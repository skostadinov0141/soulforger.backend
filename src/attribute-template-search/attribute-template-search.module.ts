import { Module } from '@nestjs/common';
import { AttributeTemplateSearchService } from './attribute-template-search.service';
import { AttributeTemplateModule } from '../attribute-template/attribute-template.module';
import { RulebookModule } from '../rulebook/rulebook.module';

@Module({
  providers: [AttributeTemplateSearchService],
  imports: [AttributeTemplateModule, RulebookModule],
  exports: [AttributeTemplateSearchService],
})
export class AttributeTemplateSearchModule {}
