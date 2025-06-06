import { Locales } from '../../enums/locales';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class TextTranslation {
  /**
   * The locale for the translation.
   * This is used to identify the language of the text.
   * @enum {Locales}
   * @example "en-US"
   */
  @Prop({ enum: Locales })
  locale: Locales;

  /**
   * The text in the specified locale.
   * This is the actual translated string that will be displayed to the user.
   * @example "Hello, world!"
   * @see Locales
   */
  @Prop()
  text: string;
}
