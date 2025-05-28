import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class BooleanMetadata {
  @Prop({ type: String, required: false })
  default?: string;

  @Prop({ type: String, required: false })
  onTrue?: string;

  @Prop({ type: String, required: false })
  onFalse?: string;
}
