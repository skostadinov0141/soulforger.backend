import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTextValueDto } from './create-text-value.dto';
import { IsString } from 'class-validator';

export class UpdateTextValueDto extends PartialType(CreateTextValueDto) {
  @ApiProperty()
  @IsString()
  _id: string;
}
