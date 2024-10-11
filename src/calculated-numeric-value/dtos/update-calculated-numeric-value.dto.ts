import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCalculatedNumericValueDto } from './create-calculated-numeric-value.dto';
import { IsString } from 'class-validator';

export class UpdateCalculatedNumericValueDto extends PartialType(
  CreateCalculatedNumericValueDto,
) {
  @ApiProperty()
  @IsString()
  _id: string;
}
