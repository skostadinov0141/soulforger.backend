import { Module } from '@nestjs/common';
import { RulebookService } from './rulebook.service';
import { RulebookController } from './rulebook.controller';

@Module({
  controllers: [RulebookController],
  providers: [RulebookService],
})
export class RulebookModule {}
