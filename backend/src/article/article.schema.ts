import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Article {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
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
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
