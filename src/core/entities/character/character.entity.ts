import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CharacterProperty } from '../character-property/character-property.entity';
import { CharacterModifier } from '../character-modifier/character-modifier.entity';

@Schema({ timestamps: true })
export class Character {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  /*
   * The properties that define the character.
   */
  @Prop({ type: [CharacterProperty] })
  properties: CharacterProperty[];

  /*
   * The modifiers that change the character's properties.
   */
  @Prop({ type: Object })
  modifiers: Record<string, CharacterModifier[]>;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
