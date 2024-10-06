import { Module } from '@nestjs/common';
import { TextValueService } from './text-value.service';

@Module({
  providers: [TextValueService]
})
export class TextValueModule {}
