import { Module } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { ModifierController } from './modifier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Modifier, ModifierSchema } from './entities/modifier.entity';
import { RulebookModule } from '../rulebook/rulebook.module';

@Module({
  controllers: [ModifierController],
  providers: [ModifierService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Modifier.name,
        schema: ModifierSchema,
      },
    ]),
    RulebookModule,
  ],
  exports: [ModifierService],
})
export class ModifierModule {}
