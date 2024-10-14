import { Controller, Get, Param, UseGuards, Request, Headers, ExecutionContext, Put, Body, Req } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuthService } from "../auth/auth.service";
import { UpdateUserNotificationDto } from "./dto/update-user-notification.dto";

@UseGuards(JwtAuthGuard)
@Controller()
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly authService: AuthService
    ) { }
    

    @Get('notifications/queue')
    async getModeratorNotification(@Req() req) {
        return await this.notificationService.getUnassignedNotifications(req.user.role);
    }

    @Get('notifications')
    async getUserNotificationById(@Req() req) {
        return await this.notificationService.getUserNotificationsById(req.user._id);
    }

    @Put('notifications/read')
    async readUserNotification(
        @Req() req,
        @Body() body: UpdateUserNotificationDto) {
            return await this.notificationService.readUserNotification(req.user._id, body);
    }

    @Put('notifications/assign')
    async assignAdminNotification(
        @Req() req,
        @Body() body ) {
            return await this.notificationService.assignAdminNotification(req.user._id, body);
        }
}