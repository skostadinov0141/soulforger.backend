import { Module } from '@nestjs/common';
import { CharacterTemplateService } from './character-template.service';
import { CharacterTemplateController } from './character-template.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CharacterTemplate,
  CharacterTemplateSchema,
} from './entities/character-template.entity';
import { RulebookService } from '../rulebook/rulebook.service';
import { TagService } from '../tag/tag.service';

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
    RulebookService,
    TagService,
  ],
  exports: [CharacterTemplateService],
})
export class CharacterTemplateModule {}
