import { Module } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { ModifierController } from './modifier.controller';

@Module({
  controllers: [ModifierController],
  providers: [ModifierService],
})
export class ModifierModule {}
