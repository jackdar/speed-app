export interface AdminNotifcation {
  _id: string;
  user_id: string;
  role: string;
  article_id: string;
  article_title: string;
  title: string;
  message: string;
  assigned: boolean;
}
