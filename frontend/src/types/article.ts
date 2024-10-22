export type Article = {
  _id: string;
  submitterId: string;
  title: string;
  author: string;
  publisher: string;
  journal: string;
  year: number;
  volume: number;
  pagesEnd: number;
  pagesStart: number;
  doi: string;
  updatedAt: Date;
  createDate: Date;
  ratings: Rating[];
  moderation: Moderation;
  analysis: Analysis;
  isPosted: false;
};

export type Rating = {
  raterId: string;
  rating: number;
  ratedDate: Date;
};

export type Moderation = {
  moderatorId: string;
  moderated: boolean;
  status: "approved" | "rejected";
  comments: string;
  moderatedDate: Date;
};

export type Analysis = {
  analystId: string;
  analysed: boolean;
  status: "not analysed" | "pending" | "approved" | "rejected";
  summary: string;
  keyFindings: string[];
  methodology: string;
  analysedDate: Date;
};
