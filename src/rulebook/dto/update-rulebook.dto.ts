import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRulebookDto } from './create-rulebook.dto';
import { IsString, Length } from 'class-validator';

export class UpdateRulebookDto extends PartialType(CreateRulebookDto) {
  @ApiProperty()
  @IsString()
  @Length(2, 64)
  owner: string;

  @ApiProperty()
  @IsString()
  @Length(2, 128)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(2, 2048)
  description: string;
}
