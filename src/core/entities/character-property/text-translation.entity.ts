import { Locales } from '../../enums/locales';
import { Prop } from '@nestjs/mongoose';

export class TextTranslation {
  @Prop({ enum: Locales })
  locale: Locales;
  @Prop()
  text: string;
}
