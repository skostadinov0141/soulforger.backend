import { CharacterProperty } from '../../core/entities/character-property/character-property.entity';
import { OmitType } from '@nestjs/swagger';

export class AddPropertyToModelDto extends OmitType(CharacterProperty, [
  'guid',
]) {}
