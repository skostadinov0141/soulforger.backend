import { Module } from '@nestjs/common';
import { FixedNumericValueService } from './fixed-numeric-value.service';

@Module({
  providers: [FixedNumericValueService]
})
export class FixedNumericValueModule {}
