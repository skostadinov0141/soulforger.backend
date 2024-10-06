import { Module } from '@nestjs/common';
import { CharacterFieldPathService } from './character-field-path.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CharacterFieldPath,
  CharacterFieldPathSchema,
} from './entities/character-field-path.entity';
import { RulebookModule } from '../rulebook/rulebook.module';

@Module({
  providers: [CharacterFieldPathService],
  imports: [
    MongooseModule.forFeature([
      {
        name: CharacterFieldPath.name,
        schema: CharacterFieldPathSchema,
      },
    ]),
    RulebookModule,
  ],
  exports: [CharacterFieldPathService, MongooseModule],
})
export class CharacterFieldPathModule {}
