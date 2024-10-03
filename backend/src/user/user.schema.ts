import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: ['guest', 'registered', 'moderator', 'analyst', 'admin'],
    default: 'guest',
  })
  role: string;

  @Prop({ type: Array, default: [] })
  articlesPublished: string[];

  @Prop({ type: Array, default: [] })
  articlesModerated: string[];

  @Prop({ type: Array, default: [] })
  articlesAnalysed: string[];

  @Prop({ type: Array, default: [] })
  articlesRated: Array<{ articleId: string; rating: number }>;
}

export const UserSchema = SchemaFactory.createForClass(User);
