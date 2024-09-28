import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateRulebookDto {
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
