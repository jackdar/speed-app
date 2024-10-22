import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class Rating {
  @Prop()
  raterId: string;

  @Prop()
  rating: number;

  @Prop({ type: Date })
  ratedDate: Date;
}

export class Moderation {
  @Prop()
  moderatorId: string;

  @Prop()
  moderated: boolean;

  @Prop()
  moderation_passed: boolean;

  @Prop()
  status: 'pending' | 'approved' | 'rejected';

  @Prop()
  comments: string;

  @Prop({ type: Date })
  moderatedDate?: Date;
}

export class Analysis {
  @Prop()
  analyserId: string;

  @Prop()
  analysed: boolean;

  @Prop()
  status: 'not analysed' | 'pending' | 'approved' | 'rejected';

  @Prop()
  summary: string;

  @Prop()
  keyFindings: string[];

  @Prop()
  methodology: string;

  @Prop({ type: Date })
  analysedDate?: Date;
}

@Schema()
export class Article {
  @Prop({ required: true })
  submitterId: string;

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

  @Prop({ type: Array, default: [] })
  ratings: Rating[];

  @Prop({ type: Date, default: Date.now })
  createDate: Date;

  @Prop({ type: Date, default: Date.now })
  lastUpdateDate: Date;

  @Prop({ type: Moderation })
  moderation: Moderation;

  @Prop({ type: Analysis })
  analysis: Analysis;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
