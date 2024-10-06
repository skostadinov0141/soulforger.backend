import { Module } from '@nestjs/common';
import { CalculatedNumericValueService } from './calculated-numeric-value.service';

@Module({
  providers: [CalculatedNumericValueService]
})
export class CalculatedNumericValueModule {}
