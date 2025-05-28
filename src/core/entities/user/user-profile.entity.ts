import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class UserProfile {
  @Prop({ required: true })
  displayName: string;

  @Prop({ required: false, unique: true })
  avatarUrl?: string;

  @Prop({ required: false })
  bio?: string;

  @Prop({ required: false })
  location?: string;

  @Prop({ required: false })
  website?: string;

  @Prop({ type: Object, required: false })
  socialLinks?: Record<string, string>;

  @Prop({ type: Object, required: false })
  metadata?: Record<string, any>;
}
