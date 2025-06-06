import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class BooleanMetadata {
  /**
   * The default value of the boolean property.
   * This is used when the property is not set or when it is reset.
   * @example false
   *
   */
  @Prop({ type: String, required: false })
  default?: boolean;

  /**
   * The on true event handler.
   * This is a string that can be used to reference a function or action to be executed when the property is set to true.
   * @example "onTrueAction"
   */
  @Prop({ type: String, required: false })
  onTrue?: string;

  /**
   * The on false event handler.
   * This is a string that can be used to reference a function or action to be executed when the property is set to false.
   * @example "onFalseAction"
   */
  @Prop({ type: String, required: false })
  onFalse?: string;
}
