import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

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
