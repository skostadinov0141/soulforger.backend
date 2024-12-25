import { Module } from '@nestjs/common';
import { CharacterTemplateService } from './character-template.service';
import { CharacterTemplateController } from './character-template.controller';

@Module({
  controllers: [CharacterTemplateController],
  providers: [CharacterTemplateService],
})
export class CharacterTemplateModule {}
