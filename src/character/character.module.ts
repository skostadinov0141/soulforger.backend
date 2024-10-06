import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ability, AbilitySchema } from './entities/ability.entity';
import { Character, CharacterSchema } from './entities/character.entity';
import { AttributeTemplateService } from './services/attribute-template.service';
import { RulebookModule } from '../rulebook/rulebook.module';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, AttributeTemplateService],
  imports: [
    RulebookModule,
    MongooseModule.forFeature([
      {
        name: Ability.name,
        schema: AbilitySchema,
      },
      {
        name: Character.name,
        schema: CharacterSchema,
      },
    ]),
  ],
})
export class CharacterModule {}
