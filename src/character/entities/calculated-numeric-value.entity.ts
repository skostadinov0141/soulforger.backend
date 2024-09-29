import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import mongoose from 'mongoose';
import { CharacterFieldPath } from './character-field-path.entity';
import { DiceRoll } from './dice-roll.entity';

@Schema()
export class CalculatedNumericValue {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Rulebook.name,
    required: true,
  })
  rulebook: Rulebook;

  @ApiProperty()
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: CharacterFieldPath.name },
    ],
    required: true,
  })
  variables: CharacterFieldPath[];

  @ApiProperty()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: DiceRoll.name }],
    required: true,
  })
  diceRolls: DiceRoll[];

  @ApiProperty()
  @Prop({ required: true })
  formula: string;

  @ApiProperty()
  @Prop()
  value?: number;
}

export const CalculatedNumericValueSchema = SchemaFactory.createForClass(
  CalculatedNumericValue,
);
