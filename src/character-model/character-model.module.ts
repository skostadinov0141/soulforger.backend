import { Module } from '@nestjs/common';
import { CharacterModelService } from './character-model.service';
import { CharacterModelController } from './character-model.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterModelSchema } from '../core/entities/character/character-model.entity';
import { CharacterSchema } from '../core/entities/character/character.entity';

@Module({
  controllers: [CharacterModelController],
  providers: [CharacterModelService],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'CharacterModel',
        schema: CharacterModelSchema,
      },
      {
        name: 'Character',
        schema: CharacterSchema,
      },
    ]),
  ],
})
export class CharacterModelModule {}
