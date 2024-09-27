import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Rulebook {
  _id: string;

  @Prop()
  owner: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const RulebookSchema = SchemaFactory.createForClass(Rulebook);
