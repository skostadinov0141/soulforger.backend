import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class NumberMetadata {
  /**
   * The default value for the number property.
   * This value is used when the property is first created or when it is reset.
   * @example 10
   * @type {number}
   * @required false
   */
  @Prop({ type: Number, required: false })
  default?: number;

  /**
   * The minimum value for the number property.
   * This value is used to validate the input and ensure it is within a certain range.
   * @example 0
   * @type {number}
   * @required false
   */
  @Prop({ type: Number, required: false })
  min?: number;

  /**
   * The maximum value for the number property.
   * This value is used to validate the input and ensure it is within a certain range.
   * @example 100
   * @type {number}
   * @required false
   */
  @Prop({ type: Number, required: false })
  max?: number;

  /**
   * The on change event handler for the number property.
   * This is a string that represents a function to be called when the value of the property changes.
   * This can be used to trigger additional logic or updates in the application.
   * @example "handleNumberChange"
   * @type {string}
   * @required false
   */
  @Prop({ type: String, required: false })
  onChange?: string;

  /**
   * The on change event handler for the minimum value of the number property.
   * This is a string that represents a function to be called when the minimum value changes.
   * @example "handleMinChange"
   * @type {string}
   * @required false
   */
  @Prop({ type: String, required: false })
  onChangeMin?: string;

  /**
   * The on change event handler for the maximum value of the number property.
   * This is a string that represents a function to be called when the maximum value changes.
   * @example "handleMaxChange"
   * @type {string}
   * @required false
   */
  @Prop({ type: String, required: false })
  onChangeMax?: string;
}
