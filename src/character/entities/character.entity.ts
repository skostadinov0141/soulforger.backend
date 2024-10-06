import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import mongoose from 'mongoose';
import { AttributeTemplate } from '../../attribute-template/entities/attribute-template.entity';
import { Ability } from './ability.entity';

@Schema()
export class Character {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Rulebook.name })
  rulebook: Rulebook;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: AttributeTemplate.name },
    ],
  })
  attributes: AttributeTemplate[];

  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Ability.name }] })
  abilities: Ability[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
