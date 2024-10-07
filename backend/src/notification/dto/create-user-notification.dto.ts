export class CreateUserNotificationDto {
    user_id: string;
    article_id: string;
    title: string;
    message: string;
    read: boolean;
}