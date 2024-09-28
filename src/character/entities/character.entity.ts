import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import mongoose from 'mongoose';
import { Attribute, AttributeSchema } from './attribute.entity';
import { Ability, AbilitySchema } from './ability.entity';

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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Attribute.name }],
  })
  attributes: Attribute[];

  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Ability.name }] })
  abilities: Ability[];
}

const CharacterSchema = SchemaFactory.createForClass(Character).pre(
  'deleteOne',
  { document: true },
  function (next) {
    AttributeSchema.remove({ _id: { $in: this.attributes } });
    AbilitySchema.remove({ _id: { $in: this.abilities } });
    next();
  },
);

export { CharacterSchema };
