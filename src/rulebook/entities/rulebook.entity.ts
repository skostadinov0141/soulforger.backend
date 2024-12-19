import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Max, Min } from 'class-validator';

@Schema()
export class Rulebook {
  @ApiProperty()
  _id: string;

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

export const RulebookSchema = SchemaFactory.createForClass(Rulebook);
