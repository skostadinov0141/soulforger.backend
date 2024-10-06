import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDiceRollDto } from './create-dice-roll.dto';
import { IsString } from 'class-validator';

export class UpdateDiceRollDto extends PartialType(CreateDiceRollDto) {
  @ApiProperty()
  @IsString()
  _id: string;
}
