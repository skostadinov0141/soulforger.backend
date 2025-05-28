import { Character } from '../character/character.entity';
import { CharacterModifier } from './character-modifier.entity';

export class CharacterModifierManager {
  addModifierToCharacter(
    character: Character,
    modifier: CharacterModifier,
  ): void {
    // destruct the target
    const parts = modifier.target.split(':');
    const location = parts[0];
    const target = parts[1];
    // if the target does not exist in the modifiers, initialize it
    if (!character[location][target]) character.modifiers[target] = [];
    // add the modifier to the target
    character.modifiers[target].push(modifier);
  }

  removeModifierFromCharacter(character: Character, modifierId: string): void {
    // find the target and modifier
    for (const target in character.modifiers) {
      // find the index of the modifier
      const index = character.modifiers[target].findIndex(
        (modifier) => modifier.correlationId === modifierId,
      );
      // if the modifier exists, remove it
      if (index !== -1) {
        character.modifiers[target].splice(index, 1);
        // if the target has no modifiers left, delete it
        if (character.modifiers[target].length === 0) {
          delete character.modifiers[target];
        }
        return;
      }
    }
  }
}
