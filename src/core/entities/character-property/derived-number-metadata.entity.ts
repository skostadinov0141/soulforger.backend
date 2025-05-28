import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class DerivedNumberMetadata {
  @Prop({ type: Number, required: false })
  default?: number;

  @Prop({ type: String, required: true })
  expression: string;

  @Prop({ type: Number, required: false })
  min?: number;

  @Prop({ type: Number, required: false })
  max?: number;

  @Prop({ type: String, required: false })
  onChange?: string;
}
