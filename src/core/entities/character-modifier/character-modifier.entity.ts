import { Prop } from '@nestjs/mongoose';
import { ModifierTypes } from '../../enums/modifier-types.enum';
import { CharacterLocations } from '../../enums/character-locations.enum';

export class CharacterModifier {
  /**
   * The unique identifier for the modifier.
   * This is used to reference the modifier in the character's modifiers object.
   * @example "123e4567-e89b-12d3-a456-426614174000"
   * @type {string}
   */
  @Prop()
  guid: string;

  /**
   * The type of the modifier.
   * This determines how the modifier affects the character's properties.
   * @enum {ModifierTypes}
   * @type {ModifierTypes}
   * @example "add"
   */
  @Prop({ type: String, enum: ModifierTypes })
  modifierType: ModifierTypes;

  /**
   * The target location of the modifier.
   * This specifies where the modifier applies to the character.
   * @enum {CharacterLocations}
   * @type {CharacterLocations}
   * @example "head"
   */
  @Prop()
  target: CharacterLocations;

  /**
   * The expression that defines the modifier's effect.
   * This is a string that can be evaluated to apply the modifier.
   * @type {string}
   * @example "${health-guid} + 50"
   */
  @Prop()
  expression: string;
}
