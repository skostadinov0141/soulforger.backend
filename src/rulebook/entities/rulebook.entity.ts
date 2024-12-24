import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Rulebook {
  /**
   * The unique identifier of the rulebook.
   * @example '676861133aa08216967be40b'
   */
  _id: string;

  /**
   * The name of the rulebook.
   * @example 'Chess'
   */
  @Prop()
  name: string;

  /**
   * The description of the rulebook.
   * @example 'A two-player strategy board game.'
   */
  @Prop()
  description?: string;
}

export const RulebookSchema = SchemaFactory.createForClass(Rulebook);
export type RulebookDocument = HydratedDocument<Rulebook>;
