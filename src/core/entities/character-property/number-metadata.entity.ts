import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class NumberMetadata {
  @Prop({ type: Number, required: false })
  default?: number;

  @Prop({ type: Number, required: false })
  min?: number;

  @Prop({ type: Number, required: false })
  max?: number;

  @Prop({ type: String, required: false })
  onChange?: string;

  @Prop({ type: String, required: false })
  onChangeMin?: string;

  @Prop({ type: String, required: false })
  onChangeMax?: string;
}
