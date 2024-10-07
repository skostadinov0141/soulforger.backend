import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFixedNumericValueDto } from './create-fixed-numeric-value.dto';
import { IsString } from 'class-validator';

export class UpdateFixedNumericValueDto extends PartialType(
  CreateFixedNumericValueDto,
) {
  @ApiProperty()
  @IsString()
  _id: string;
}
