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
} from '../calculated-numeric-value/entities/calculated-numeric-value.entity';
import {
  TextValue,
  TextValueSchema,
} from '../text-value/entities/text-value.entity';
import {
  FixedNumericValue,
  FixedNumericValueSchema,
} from '../fixed-numeric-value/entities/fixed-numeric-value.entity';
import {
  DiceRoll,
  DiceRollSchema,
} from '../dice-roll/entities/dice-roll.entity';
import {
  CharacterFieldPath,
  CharacterFieldPathSchema,
} from '../character-field-path/entities/character-field-path.entity';
import { TagModule } from '../tag/tag.module';
import { GroupModule } from '../group/group.module';
import { CharacterFieldPathModule } from '../character-field-path/character-field-path.module';
import { DiceRollModule } from '../dice-roll/dice-roll.module';
import { AttributeTemplateSearchModule } from '../attribute-template-search/attribute-template-search.module';
import { TextValueModule } from '../text-value/text-value.module';
import { FixedNumericValueModule } from '../fixed-numeric-value/fixed-numeric-value.module';
import { CalculatedNumericValueModule } from '../calculated-numeric-value/calculated-numeric-value.module';
import { RulebookModule } from '../rulebook/rulebook.module';

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
    TagModule,
    GroupModule,
    CharacterFieldPathModule,
    DiceRollModule,
    AttributeTemplateSearchModule,
    TextValueModule,
    FixedNumericValueModule,
    CalculatedNumericValueModule,
    RulebookModule,
  ],
  controllers: [AttributeTemplateController],
  providers: [AttributeTemplateService],
})
export class AttributeTemplateModule {}
