import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, Length } from 'class-validator';
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
  @Length(4, 128)
  name: string;

  /**
   * The description of the rulebook.
   * @example 'A two-player strategy board game.'
   */
  @Prop()
  @IsOptional()
  @Length(4, 256)
  description?: string;
}

export const RulebookSchema = SchemaFactory.createForClass(Rulebook);
export type RulebookDocument = HydratedDocument<Rulebook>;
