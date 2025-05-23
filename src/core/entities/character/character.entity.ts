import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CharacterProperty } from '../character-property/character-property.entity';

@Schema({ timestamps: true })
export class Character {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: CharacterProperty })
  properties: CharacterProperty[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
