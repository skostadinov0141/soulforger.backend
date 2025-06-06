import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CharacterProperty } from '../character-property/character-property.entity';
import { CharacterModifier } from '../character-modifier/character-modifier.entity';

@Schema({ timestamps: true })
export class CharacterModel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  /**
   * The name of the character model.
   * @type {string}
   * @example "DSA Character Model v1.0"
   */
  @Prop({ type: String, required: true })
  name: string;

  /**
   * The properties that define the character.
   * These properties can include attributes like strength, agility, intelligence, etc.
   * Each property is an instance of CharacterProperty.
   * @type {CharacterProperty[]}
   */
  @Prop({ type: [CharacterProperty] })
  properties: CharacterProperty[];

  /**
   * The modifiers that change the character's properties.
   * These modifiers can include buffs, debuffs, or other effects that alter the character's stats.
   * Each modifier is an instance of CharacterModifier.
   * @type {Record<string, CharacterModifier[]>}
   */
  @Prop({ type: Object })
  modifiers: Record<string, CharacterModifier[]>;
}

export const CharacterModelSchema =
  SchemaFactory.createForClass(CharacterModel);
