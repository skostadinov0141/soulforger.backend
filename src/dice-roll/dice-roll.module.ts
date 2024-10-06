import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiceRoll, DiceRollSchema } from './entities/dice-roll.entity';
import { RulebookModule } from '../rulebook/rulebook.module';
import { DiceRollService } from './dice-roll.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DiceRoll.name,
        schema: DiceRollSchema,
      },
    ]),
    RulebookModule,
  ],
  providers: [DiceRollService],
  exports: [DiceRollService, MongooseModule],
})
export class DiceRollModule {}
