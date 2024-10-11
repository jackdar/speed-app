import { Controller, Get, Param, UseGuards, Request, Headers, ExecutionContext } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "src/auth/auth.service";

@UseGuards(JwtAuthGuard)
@Controller()
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly authService: AuthService
    ) { }


    @Get('notifications/moderator')
    async getModeratorNotification() {
        return await this.notificationService.getUnassignedNotifications("moderator");
    }

    @Get('notifications')
    async getUserNotificationById(@Headers() headers) {
        // console.log(headers)
        let token = headers["authorization"].replace('Bearer ', "");
        let decoded = await this.authService.verify(token);
        let id = decoded.uid;
        console.log(id)
        return await this.notificationService.getUserNotificationsById(id);
    }


    @Get("notifications/new")
    async getNotificationsNew(@Headers() headers) {
        let token = headers["authorization"].replace("Bearer ", "");
        let decoded = await this.authService.verify(token);
        let id = decoded.uid;
        return await this.notificationService.getNotificationsNew(decoded);
    }
}