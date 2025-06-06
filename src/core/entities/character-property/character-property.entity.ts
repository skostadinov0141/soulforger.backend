import { Prop, Schema } from '@nestjs/mongoose';
import { TextTranslation } from './text-translation.entity';
import { PropertyTypes } from '../../enums/property-types.enum';
import { DerivedNumberMetadata } from './derived-number-metadata.entity';
import { NumberMetadata } from './number-metadata.entity';
import { TextMetadata } from './text-metadata.entity';
import { BooleanMetadata } from './boolean-metadata.entity';
import { SchemaTypes } from 'mongoose';

@Schema({ _id: false })
export class CharacterProperty {
  /**
   * The type of the property.
   * @enum {PropertyTypes}
   * @example "number"
   */
  @Prop({ enum: PropertyTypes })
  type: PropertyTypes;

  /**
   * The unique identifier for the property.
   * This is used to reference the property in other parts of the application.
   */
  @Prop({ required: true, unique: true })
  guid: string;

  /**
   * The name of the property.
   * This is a localized string that can be translated into different languages.
   * @example { "de-DE": "Stärke", "en-US": "Strength" }
   * @see TextTranslation
   */
  @Prop({ required: true })
  name: TextTranslation[];

  /**
   * The description of the property.
   * This is a localized string that can be translated into different languages.
   * @example { "de-DE": "Die Stärke des Charakters", "en-US": "The strength of the character" }
   * @see TextTranslation
   */
  @Prop({ required: false })
  description: TextTranslation[];

  /**
   * The metadata associated with the property.
   * This can be of different types depending on the property type.
   * @see DerivedNumberMetadata
   * @see NumberMetadata
   * @see TextMetadata
   * @see BooleanMetadata
   */
  @Prop({ type: SchemaTypes.Mixed })
  metadata:
    | DerivedNumberMetadata
    | NumberMetadata
    | TextMetadata
    | BooleanMetadata;

  /**
   * The value of the property.
   * This can be of any type, depending on the property type.
   * For example, it can be a number, string, boolean, or any other type.
   * @example 42
   */
  @Prop({ type: SchemaTypes.Mixed })
  value?: any;
}
