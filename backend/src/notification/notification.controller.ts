import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Get('notifications/moderator')
    async getModeratorNotification() {
        return await this.notificationService.getUnassignedNotifications("moderator");
    }

    @UseGuards(JwtAuthGuard)
    @Get('notifications')
    async getUserNotificationById(@Request() req) {
        console.log(req);
        let id = "66f63c2eef9860fbca28953c"
        return await this.notificationService.getUserNotificationsById(id);
    }
}