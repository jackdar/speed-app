export class CreateAdminNotifcationDto {
    user_email: string;
    role: string;
    article_id: string;
    title: string;
    article_title: string;
    message: string;
    assigned: boolean;
    assignee_id: string;
}