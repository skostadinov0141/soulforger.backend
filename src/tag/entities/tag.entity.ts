import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

@Schema()
export class Tag {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  @Length(4, 32)
  name: string;
}
