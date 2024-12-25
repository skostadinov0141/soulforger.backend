import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Rulebook } from '../../rulebook/entities/rulebook.entity';

@Schema({ timestamps: true })
export class Modifier {
  /**
   * The unique identifier of the modifier.
   * @example '676acaaaa0c6c947870ae81f'
   */
  _id: string;

  /**
   * The date the modifier was created.
   * @example '2021-01-01T00:00:00.000Z'
   */
  createdAt: Date;

  /**
   * The date the modifier was last updated.
   * @example '2021-01-01T00:00:00.000Z'
   */
  updatedAt: Date;

  /**
   * The rulebook associated with the modifier.
   */
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: Rulebook.name,
  })
  rulebook: Rulebook;

  /**
   * Is the modifier enabled.
   *
   * @example true
   */
  @Prop({ required: true })
  enabled: boolean;

  /**
   * Should the modifier be applied before the target's base modifier.
   * @example true
   */
  @Prop({ required: true })
  beforeModifier: boolean;

  /**
   * The target path of the modifier.
   * @example 'character.attributes'
   */
  @Prop({ required: true })
  targetPath: string; // TODO change to PathEntity ENUM

  /**
   * The unique identifier of the target that should be modified.
   * @example '676acaaaa0c6c947870ae81f'
   */
  @Prop({ required: true })
  targetId: string;

  /**
   * The source path of the source that created the modifier.
   * @example 'character.attributes'
   */
  @Prop({ required: true })
  sourcePath: string; // TODO change to PathEntity ENUM

  /**
   * The unique identifier of the source that created the modifier.
   * @example '676acaaaa0c6c947870ae81f'
   */
  @Prop({ required: true })
  sourceId: string;

  /**
   * The mode of the modifier.
   * @example 'add'
   */
  @Prop({
    required: true,
    enum: ['add', 'subtract', 'divide', 'multiply', 'replace'],
  })
  mode: 'add' | 'subtract' | 'divide' | 'multiply' | 'replace';

  /**
   * The inverse mode of the modifier.
   * @example 'subtract'
   */
  @Prop({
    required: true,
    enum: ['add', 'subtract', 'multiply', 'replace'],
  })
  inverseMode: 'add' | 'subtract' | 'multiply' | 'replace';
}

export const ModifierSchema = SchemaFactory.createForClass(Modifier);
export type ModifierDocument = HydratedDocument<Modifier>;
