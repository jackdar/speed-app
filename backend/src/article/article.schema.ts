import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publisher: string;

  @Prop()
  journal: string;

  @Prop()
  year: number;

  @Prop()
  volume: number;

  @Prop()
  pagesStart: number;

  @Prop()
  pagesEnd: number;

  @Prop()
  doi: string;

  @Prop()
  isPosted: boolean;

  @Prop({ type: Date })
  createDate: Date;

  @Prop({ type: Date, default: Date.now})
  lastUpdateDate: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
