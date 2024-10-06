import { Module } from '@nestjs/common';
import { TextValueService } from './text-value.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TextValue, TextValueSchema } from './entities/text-value.entity';
import { RulebookModule } from '../rulebook/rulebook.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TextValue.name,
        schema: TextValueSchema,
      },
    ]),
    RulebookModule,
  ],
  providers: [TextValueService],
  exports: [TextValueService, MongooseModule],
})
export class TextValueModule {}
