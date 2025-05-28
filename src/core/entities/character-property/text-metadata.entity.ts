import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class TextMetadata {
  @Prop({ type: String, required: false })
  default?: string;

  @Prop({ type: String, required: false })
  onChange?: string;
}
