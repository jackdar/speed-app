import { Controller, Get } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Get('notifications/moderator')
    async getModeratorNotification() {
        return await this.notificationService.getUnassignedNotifications("moderator");
    }

}