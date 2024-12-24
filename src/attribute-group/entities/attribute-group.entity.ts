import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';
import { IsOptional, Length } from 'class-validator';

@Schema({ timestamps: true })
export class AttributeGroup {
  /**
   * The unique identifier of the attribute group.
   *
   * @example '5f4e3d8e3f3e4d2e3f4e3d8e'
   */
  _id: string;

  /**
   * The Date the attribute was created.
   *
   * @example '2020-09-01T00:00:00.000Z'
   */
  createdAt: Date;

  /**
   * The Date the attribute was last updated.
   *
   * @example '2020-09-01T00:00:00.000Z'
   */
  updatedAt: Date;

  /**
   * The name of the attribute group.
   *
   * @example 'Magic Attributes'
   */
  @Prop({ required: true })
  @Length(3, 128)
  name: string;

  /**
   * The description of the attribute group.
   *
   * @example 'Attributes that are magical.'
   */
  @Prop()
  @IsOptional()
  @Length(3, 2048)
  description?: string;

  /**
   * The rulebook that the attribute group belongs to.
   *
   * @example '5f4e3d8e3f3e4d2e3f4e3d8e'
   */
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Rulebook.name })
  rulebook: Rulebook;
}

export const AttributeGroupSchema =
  SchemaFactory.createForClass(AttributeGroup);
export type AttrivuteGroupDocument = HydratedDocument<AttributeGroup>;
