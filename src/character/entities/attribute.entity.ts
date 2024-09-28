import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import mongoose from 'mongoose';
import {
  FixedNumericValue,
  FixedNumericValueSchema,
} from './fixed-numeric-value.entity';
import {
  CalculatedNumericValue,
  CalculatedNumericValueSchema,
} from './calculated-numeric-value.entity';
import { TextValue, TextValueSchema } from './text-value.entity';

@Schema()
export class Attribute {
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
  attribute: FixedNumericValue | CalculatedNumericValue | TextValue;
}

const AttributeSchema = SchemaFactory.createForClass(Attribute).pre(
  'deleteOne',
  { document: true },
  function (next) {
    if (this.attributeType === FixedNumericValue.name) {
      FixedNumericValueSchema.remove({ _id: this.attribute });
    } else if (this.attributeType === CalculatedNumericValue.name) {
      CalculatedNumericValueSchema.remove({ _id: this.attribute });
    } else if (this.attributeType === TextValue.name) {
      TextValueSchema.remove({ _id: this.attribute });
    }
    next();
  },
);

export { AttributeSchema };
