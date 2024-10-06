import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CharacterFieldPath,
  CharacterFieldPathSchema,
} from './entities/character-field-path.entity';
import { Ability, AbilitySchema } from './entities/ability.entity';
import { Attribute, AttributeSchema } from './entities/attribute.entity';
import {
  CalculatedNumericValue,
  CalculatedNumericValueSchema,
} from './entities/calculated-numeric-value.entity';
import { Character, CharacterSchema } from './entities/character.entity';
import { DiceRoll, DiceRollSchema } from './entities/dice-roll.entity';
import {
  FixedNumericValue,
  FixedNumericValueSchema,
} from './entities/fixed-numeric-value.entity';
import { Tag, TagSchema } from '../tag/entities/tag.entity';
import { TextValue, TextValueSchema } from './entities/text-value.entity';
import { AttributeTemplateService } from './services/attribute-template.service';
import { RulebookModule } from '../rulebook/rulebook.module';
import { Group, GroupSchema } from '../group/entities/group.entity';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, AttributeTemplateService],
  imports: [
    RulebookModule,
    MongooseModule.forFeature([
      {
        name: CharacterFieldPath.name,
        schema: CharacterFieldPathSchema,
      },
      {
        name: Ability.name,
        schema: AbilitySchema,
      },
      {
        name: Attribute.name,
        schema: AttributeSchema,
      },
      {
        name: CalculatedNumericValue.name,
        schema: CalculatedNumericValueSchema,
      },
      {
        name: Character.name,
        schema: CharacterSchema,
      },
      {
        name: DiceRoll.name,
        schema: DiceRollSchema,
      },
      {
        name: FixedNumericValue.name,
        schema: FixedNumericValueSchema,
      },
      {
        name: Tag.name,
        schema: TagSchema,
      },
      {
        name: TextValue.name,
        schema: TextValueSchema,
      },
      {
        name: Group.name,
        schema: GroupSchema,
      },
    ]),
  ],
})
export class CharacterModule {}
