import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class DerivedNumberMetadata {
  /**
   * The default value for the derived number.
   * If not provided, the value will be calculated based on the expression.
   * @type {number}
   * @example 10
   * @required false
   */
  @Prop({ type: Number, required: false })
  default?: number;

  /**
   * The expression used to calculate the derived number.
   * This expression can reference other properties of the character.
   * @type {string}
   * @example "${strenght-guid} - 5"
   * @required true
   */
  @Prop({ type: String, required: true })
  expression: string;

  /**
   * The minimum value for the derived number.
   * If the calculated value is less than this, it will be set to this value.
   * @type {number}
   * @required false
   */
  @Prop({ type: Number, required: false })
  min?: number;

  /**
   * The maximum value for the derived number.
   * If the calculated value is greater than this, it will be set to this value.
   * @type {number}
   * @required false
   */
  @Prop({ type: Number, required: false })
  max?: number;

  /**
   * The function to call when the derived number changes.
   * This can be used to trigger updates in other parts of the application.
   * @type {string}
   * @required false
   */
  @Prop({ type: String, required: false })
  onChange?: string;
}
