import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AccountLinks } from '../../enums/account-links.enum';
import { UserProfile } from './user-profile.entity';

@Schema({ timestamps: true })
export class User {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: Object })
  linkedAccounts: Record<AccountLinks, any>;

  @Prop({ type: UserProfile })
  profile: UserProfile;
}

export const UserSchema = SchemaFactory.createForClass(User);
