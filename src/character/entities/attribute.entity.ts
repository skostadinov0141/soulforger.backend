import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import mongoose from 'mongoose';
import { FixedNumericValue } from './fixed-numeric-value.entity';
import { CalculatedNumericValue } from './calculated-numeric-value.entity';
import { TextValue } from './text-value.entity';

@Schema()
export class Attribute {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  template?: boolean;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Rulebook.name,
    required: true,
  })
  rulebook: Rulebook;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
    enum: [FixedNumericValue.name, CalculatedNumericValue.name, TextValue.name],
  })
  attributeType: string;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'attributeType',
    required: true,
  })
  attributeValue: FixedNumericValue | CalculatedNumericValue | TextValue;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
