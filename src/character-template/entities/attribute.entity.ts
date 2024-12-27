import { Tag } from '../../tag/entities/tag.entity';
import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class Attribute {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: Tag.name })
  tags: Tag[];

  @Prop({ required: true })
  value: number;
}
