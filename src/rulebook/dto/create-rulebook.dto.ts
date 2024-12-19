import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRulebookDto {
  @Prop()
  @ApiProperty()
  @Max(128)
  @Min(4)
  @IsString()
  name: string;

  @Prop()
  @ApiProperty()
  @Max(2048)
  @IsString()
  @IsOptional()
  description?: string;
}
