import { TextTranslation } from './text-translation.entity';
import { Prop } from '@nestjs/mongoose';

export class Requirement {
  @Prop()
  title: TextTranslation[];
  @Prop()
  description: TextTranslation[];
  @Prop()
  expression: string;
}
