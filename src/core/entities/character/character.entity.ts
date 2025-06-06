import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CharacterProperty } from '../character-property/character-property.entity';
import { CharacterModifier } from '../character-modifier/character-modifier.entity';

@Schema({ timestamps: true })
export class Character {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

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

export const CharacterSchema = SchemaFactory.createForClass(Character);
