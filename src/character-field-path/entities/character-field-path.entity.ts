import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';

@Schema()
export class CharacterFieldPath {
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Rulebook.name,
    required: true,
  })
  rulebook: Rulebook;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  path: string;

  @Prop()
  value?: number;
}

export const CharacterFieldPathSchema =
  SchemaFactory.createForClass(CharacterFieldPath);
