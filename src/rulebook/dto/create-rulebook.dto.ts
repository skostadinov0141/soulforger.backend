import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { IsOptional, Length } from 'class-validator';

export class CreateRulebookDto {
  @Prop()
  @ApiProperty()
  @Length(4, 128)
  name: string;

  @Prop()
  @ApiProperty()
  @Length(0, 2048)
  @IsOptional()
  description?: string;
}
