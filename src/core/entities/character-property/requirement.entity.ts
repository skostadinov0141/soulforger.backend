import { Prop } from '@nestjs/mongoose';

export class Requirement {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  expression: string;
}
