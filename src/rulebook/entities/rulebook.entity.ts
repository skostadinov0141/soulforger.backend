import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Rulebook {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  owner: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  description: string;
}

export const RulebookSchema = SchemaFactory.createForClass(Rulebook);
