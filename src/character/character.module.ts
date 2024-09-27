import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CharacterFieldPath,
  CharacterFieldPathEntity,
} from './entities/character-field-path.entity';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService],
  imports: [
    MongooseModule.forFeature([
      { name: CharacterFieldPath.name, schema: CharacterFieldPathEntity },
    ]),
  ],
})
export class CharacterModule {}
