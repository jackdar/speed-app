export interface UserNotification {
  _id: string;
  user_id: string;
  article_id: string;
  article_title: string;
  title: string;
  message: string;
  read: boolean;
}
