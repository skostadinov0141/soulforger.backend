import { Module } from '@nestjs/common';
import { AttributeTemplateService } from './attribute-template.service';
import { AttributeTemplateController } from './attribute-template.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttributeTemplate,
  AttributeTemplateSchema,
} from './entities/attribute-template.entity';
import {
  CalculatedNumericValue,
  CalculatedNumericValueSchema,
} from './entities/calculated-numeric-value.entity';
import { TextValue, TextValueSchema } from './entities/text-value.entity';
import {
  FixedNumericValue,
  FixedNumericValueSchema,
} from './entities/fixed-numeric-value.entity';
import {
  DiceRoll,
  DiceRollSchema,
} from '../dice-roll/entities/dice-roll.entity';
import {
  CharacterFieldPath,
  CharacterFieldPathSchema,
} from '../character-field-path/entities/character-field-path.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AttributeTemplate.name,
        schema: AttributeTemplateSchema,
      },
      {
        name: TextValue.name,
        schema: TextValueSchema,
      },
      {
        name: FixedNumericValue.name,
        schema: FixedNumericValueSchema,
      },
      {
        name: CalculatedNumericValue.name,
        schema: CalculatedNumericValueSchema,
      },
      {
        name: DiceRoll.name,
        schema: DiceRollSchema,
      },
      {
        name: CharacterFieldPath.name,
        schema: CharacterFieldPathSchema,
      },
    ]),
  ],
  controllers: [AttributeTemplateController],
  providers: [AttributeTemplateService],
})
export class AttributeTemplateModule {}
