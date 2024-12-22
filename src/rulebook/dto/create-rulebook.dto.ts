import { Prop } from '@nestjs/mongoose';
import { IsOptional, Length } from 'class-validator';

export class CreateRulebookDto {
  /**
   * Name of the rulebook.
   * @example "Chess Rules"
   */
  @Prop()
  @Length(4, 128)
  name: string;

  /**
   * Description of the rulebook.
   * @example "This rulebook contains the rules for the game of chess."
   */
  @Prop()
  @Length(0, 2048)
  @IsOptional()
  description?: string;
}
