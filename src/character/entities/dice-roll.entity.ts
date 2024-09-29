import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import mongoose from 'mongoose';

@Schema()
export class DiceRoll {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Rulebook.name })
  rulebook: Rulebook;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  diceSides: number;

  @ApiProperty()
  @Prop()
  diceAmount: number;

  @ApiProperty()
  @Prop()
  modifier: number;

  @ApiProperty()
  @Prop()
  value: number;
}

export const DiceRollSchema = SchemaFactory.createForClass(DiceRoll);
