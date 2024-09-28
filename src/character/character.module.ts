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
import { Tag, TagSchema } from './entities/tag.entity';
import { TextValue, TextValueSchema } from './entities/text-value.entity';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CharacterFieldPath.name,
        useFactory: () => CharacterFieldPathSchema,
      },
      {
        name: Ability.name,
        useFactory: () => AbilitySchema,
      },
      {
        name: Attribute.name,
        useFactory: () => AttributeSchema,
      },
      {
        name: CalculatedNumericValue.name,
        useFactory: () => CalculatedNumericValueSchema,
      },
      {
        name: Character.name,
        useFactory: () => CharacterSchema,
      },
      {
        name: DiceRoll.name,
        useFactory: () => DiceRollSchema,
      },
      {
        name: FixedNumericValue.name,
        useFactory: () => FixedNumericValueSchema,
      },
      {
        name: Tag.name,
        useFactory: () => TagSchema,
      },
      {
        name: TextValue.name,
        useFactory: () => TextValueSchema,
      },
    ]),
  ],
})
export class CharacterModule {}
