import { OmitType } from '@nestjs/swagger';
import { CharacterModifier } from '../../core/entities/character-modifier/character-modifier.entity';

export class AddModifierToModelDto extends OmitType(CharacterModifier, [
  'guid',
]) {}
