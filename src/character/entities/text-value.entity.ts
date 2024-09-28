import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import mongoose from 'mongoose';

@Schema()
export class TextValue {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  type: 'TextValue';

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Rulebook.name })
  rulebook: Rulebook;

  @ApiProperty()
  @Prop()
  value: string;
}

export const TextValueEntity = SchemaFactory.createForClass(TextValue);
