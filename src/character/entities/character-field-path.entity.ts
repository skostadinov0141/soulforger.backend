import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';

@Schema()
export class CharacterFieldPath {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Rulebook.name })
  ruleBook: Rulebook;

  @Prop()
  name: string;

  @Prop()
  path: string;

  @Prop()
  value: number;
}

export const CharacterFieldPathSchema =
  SchemaFactory.createForClass(CharacterFieldPath);
