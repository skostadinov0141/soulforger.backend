import { Character } from '../character/character.entity';
import { CharacterModifier } from './character-modifier.entity';
import { ExpressionManager } from '../expression-manager.entity';
import { ModifierTypes } from '../../enums/modifier-types.enum';

export class CharacterModifierManager {
  /**
   * Add a modifier to a character's property.
   * @param character - The character to which the modifier will be added.
   * @param modifier - The modifier to be added to the character.
   */
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

  /**
   * Remove a modifier from a character's property.
   * @param character - The character from which the modifier will be removed.
   * @param modifierId - The ID of the modifier to be removed.
   */
  removeModifierFromCharacter(character: Character, modifierId: string): void {
    // find the target and modifier
    for (const target in character.modifiers) {
      // find the index of the modifier
      const index = character.modifiers[target].findIndex(
        (modifier) => modifier.guid === modifierId,
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

  /**
   * Apply a modifier to a character's property based on its location and target.
   * This method evaluates the modifier's expression and applies it to the character's property.
   * @param character - The character to which the modifier will be applied.
   * @param location - The location of the property in the character (e.g., 'properties').
   * @param target - The specific target within the location as a GUID.
   */
  private applyModifierToCharacter(
    character: Character,
    location: string,
    target: string,
  ): void {
    // Ensure the modifier exists in the character's modifiers
    if (!character.modifiers[target]) {
      throw new Error(
        `Modifier target "${target}" does not exist in character modifiers.`,
      );
    }
    // Extract the modifier from the character's modifiers
    const modifier = character.modifiers[target].find(
      (mod) => mod.target === `${location}:${target}`,
    );
    if (!modifier) {
      throw new Error(
        `Modifier for target "${target}" at location "${location}" not found.`,
      );
    }
    // Parse the modifier expression
    const parsedExpression = new ExpressionManager(
      modifier.expression,
    ).parseExpression(character.properties);
    // Evaluate the expression to get the value
    const expressionValue = new ExpressionManager().evaluateExpression(
      parsedExpression,
    );
    // Init the current value
    const currentValue = character[location].find(
      (i) => i.guid === target,
    )?.value;
    if (currentValue === undefined) {
      throw new Error(
        `Target "${target}" does not exist in location "${location}".`,
      );
    }
    // Init the resulting expression
    let resultingExpression = '';
    // Generate the resulting expression based on the modifier type
    switch (modifier.modifierType) {
      case ModifierTypes.ADD:
        resultingExpression = `${currentValue} + ${expressionValue}`;
        break;
      case ModifierTypes.SUBTRACT:
        resultingExpression = `${currentValue} - ${expressionValue}`;
        break;
      case ModifierTypes.MULTIPLY:
        resultingExpression = `${currentValue} * ${expressionValue}`;
        break;
      case ModifierTypes.DIVIDE:
        if (expressionValue === 0) {
          throw new Error('Division by zero is not allowed.');
        }
        resultingExpression = `${currentValue} / ${expressionValue}`;
        break;
      case ModifierTypes.SET:
        resultingExpression = expressionValue.toString();
        break;
    }
    // Evaluate the resulting expression
    const result = new ExpressionManager().evaluateExpression(
      resultingExpression,
    );
    // Set the value in the character's location
    const targetProperty = character[location].find((i) => i.guid === target);
    if (targetProperty) {
      targetProperty.value = result;
    } else {
      throw new Error(
        `Target "${target}" does not exist in location "${location}".`,
      );
    }
  }

  /**
   * Apply all modifiers to the character's properties.
   * This method iterates through all modifiers and applies them to the character.
   * @param character - The character whose properties will be modified.
   */
  applyModifiersToCharacter(character: Character): void {
    // Iterate through each modifier in the character
    for (const target in character.modifiers) {
      // Apply the modifier to the character's properties
      this.applyModifierToCharacter(character, 'properties', target);
    }
    // Optionally, you can also apply modifiers to other locations like 'skills', 'abilities', etc.
  }
}
