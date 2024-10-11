import { Module } from '@nestjs/common';
import { CalculatedNumericValueService } from './calculated-numeric-value.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CalculatedNumericValue,
  CalculatedNumericValueSchema,
} from './entities/calculated-numeric-value.entity';
import { DiceRollModule } from '../dice-roll/dice-roll.module';
import { RulebookModule } from '../rulebook/rulebook.module';
import { CharacterFieldPathModule } from '../character-field-path/character-field-path.module';

@Module({
  providers: [CalculatedNumericValueService],
  imports: [
    MongooseModule.forFeature([
      {
        name: CalculatedNumericValue.name,
        schema: CalculatedNumericValueSchema,
      },
    ]),
    RulebookModule,
    CharacterFieldPathModule,
    DiceRollModule,
  ],
  exports: [CalculatedNumericValueService, MongooseModule],
})
export class CalculatedNumericValueModule {}
