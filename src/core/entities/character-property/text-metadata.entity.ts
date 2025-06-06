import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class TextMetadata {
  /**
   * The default value for the text metadata.
   * This is the value that will be used if no other value is provided.
   * @example "Default text value"
   * @type {string}
   * @required false
   */
  @Prop({ type: String, required: false })
  default?: string;

  /**
   * The on change event handler for the text metadata.
   * This is a string that represents the function to be called when the value changes.
   * @example "handleTextChange"
   * @type {string}
   * @required false
   */
  @Prop({ type: String, required: false })
  onChange?: string;
}
