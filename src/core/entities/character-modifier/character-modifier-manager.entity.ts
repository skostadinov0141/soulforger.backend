import { Character } from '../character/character.entity';
import { CharacterModifier } from './character-modifier.entity';

export class CharacterModifierManager {
  addModifierToCharacter(
    character: Character,
    modifier: CharacterModifier,
  ): Character {}
}
