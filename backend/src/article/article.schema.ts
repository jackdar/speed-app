import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class Moderation {
  @Prop()
  moderatorId: string;

  @Prop()
  moderated: boolean;

  @Prop()
  moderationPassed: boolean;
}

export class Analysis {
  @Prop()
  analystId: string;

  @Prop()
  analyzed: boolean;

  @Prop()
  analyzePassed: boolean;
}

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

  @Prop({ type: Date, default: Date.now })
  lastUpdateDate: Date;

  @Prop()
  moderationDetails: Moderation;

  @Prop()
  analysisDetails: Analysis;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
