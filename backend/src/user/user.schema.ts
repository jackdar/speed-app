import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Article } from '../article/article.schema';

export type UserDocument = User & Document;

export class UserRating {
  articleId: string;
  rating: number;
  ratedDate: Date;
}

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: ['guest', 'registered', 'moderator', 'analyst', 'admin'],
    default: 'guest',
  })
  role: string;

  @Prop()
  bio: string;

  @Prop({ type: Array, default: [] })
  articlesSubmitted: Article[];

  @Prop({ type: Array, default: [] })
  articlesModerated: Article[];

  @Prop({ type: Array, default: [] })
  articlesAnalysed: Article[];

  @Prop({ type: Array, default: [] })
  articlesRated: UserRating[];
}

export const UserSchema = SchemaFactory.createForClass(User);
