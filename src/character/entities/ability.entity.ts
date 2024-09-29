import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import mongoose from 'mongoose';
import { DiceRoll } from './dice-roll.entity';
import { CharacterFieldPath } from './character-field-path.entity';
import { Tag } from './tag.entity';

@Schema()
export class Ability {
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
  description: string;

  @ApiProperty()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: DiceRoll.name }],
  })
  diceRolls: DiceRoll[];

  @ApiProperty()
  @Prop()
  parser: string;

  @ApiProperty()
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: CharacterFieldPath.name },
    ],
  })
  variables: CharacterFieldPath[];

  @ApiProperty()
  @Prop()
  formula: string;

  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }] })
  tags: Tag[];
}

export const AbilitySchema = SchemaFactory.createForClass(Ability);
