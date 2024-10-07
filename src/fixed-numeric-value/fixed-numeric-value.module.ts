import { Module } from '@nestjs/common';
import { FixedNumericValueService } from './fixed-numeric-value.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FixedNumericValue,
  FixedNumericValueSchema,
} from './entities/fixed-numeric-value.entity';
import { RulebookModule } from '../rulebook/rulebook.module';

@Module({
  providers: [FixedNumericValueService],
  imports: [
    MongooseModule.forFeature([
      { name: FixedNumericValue.name, schema: FixedNumericValueSchema },
    ]),
    RulebookModule,
  ],
  exports: [FixedNumericValueService, MongooseModule],
})
export class FixedNumericValueModule {}
