import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import mongoose from 'mongoose';

@Schema()
export class Tag {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Rulebook.name })
  rulebook: Rulebook;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop({
    enum: ['attribute', 'ability'],
  })
  for: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
