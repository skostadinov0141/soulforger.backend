import { Module } from '@nestjs/common';
import { RulebookService } from './rulebook.service';
import { RulebookController } from './rulebook.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rulebook, RulebookSchema } from './entities/rulebook.entity';

@Module({
  controllers: [RulebookController],
  providers: [RulebookService],
  imports: [
    MongooseModule.forFeature([
      { name: Rulebook.name, schema: RulebookSchema },
    ]),
  ],
  exports: [MongooseModule, RulebookService],
})
export class RulebookModule {}
