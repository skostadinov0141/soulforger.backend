import { Prop } from '@nestjs/mongoose';
import { TextTranslation } from './text-translation.entity';
import { PropertyTypes } from '../../enums/property-types.enum';
import { DerivedNumberMetadata } from './derived-number-metadata.entity';
import { NumberMetadata } from './number-metadata.entity';
import { TextMetadata } from './text-metadata.entity';
import { BooleanMetadata } from './boolean-metadata.entity';
import { SchemaTypes } from 'mongoose';

export class CharacterProperty {
  @Prop({ enum: PropertyTypes })
  type: PropertyTypes;

  @Prop({ required: true, unique: true })
  guid: string;

  @Prop({ default: true })
  autoUpdateDependants: boolean = true;

  @Prop({ required: true })
  name: TextTranslation[];

  @Prop({ required: false })
  description: TextTranslation[];

  @Prop({ type: SchemaTypes.Mixed })
  metadata:
    | DerivedNumberMetadata
    | NumberMetadata
    | TextMetadata
    | BooleanMetadata;

  @Prop({ type: SchemaTypes.Mixed })
  value?: any;
}
