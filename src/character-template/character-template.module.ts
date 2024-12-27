import { Module } from '@nestjs/common';
import { CharacterTemplateService } from './character-template.service';
import { CharacterTemplateController } from './character-template.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CharacterTemplate,
  CharacterTemplateSchema,
} from './entities/character-template.entity';
import { TagModule } from '../tag/tag.module';
import { RulebookModule } from '../rulebook/rulebook.module';

@Module({
  controllers: [CharacterTemplateController],
  providers: [CharacterTemplateService],
  imports: [
    MongooseModule.forFeature([
      {
        name: CharacterTemplate.name,
        schema: CharacterTemplateSchema,
      },
    ]),
    RulebookModule,
    TagModule,
  ],
  exports: [CharacterTemplateService],
})
export class CharacterTemplateModule {}
