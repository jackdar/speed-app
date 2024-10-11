import { Controller, Get, Param, UseGuards, Request, Headers, ExecutionContext, Put, Body } from "@nestjs/common";
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
    async getModeratorNotification(@Headers() headers) {
        let token = headers["authorization"].replace("Bearer ", "");
        let decoded = await this.authService.verify(token);
        return await this.notificationService.getUnassignedNotifications(decoded.role);
    }

    @Get('notifications')
    async getUserNotificationById(@Headers() headers) {
        // console.log(headers)
        let token = headers["authorization"].replace('Bearer ', "");
        let decoded = await this.authService.verify(token);
        let id = decoded.uid;
        return await this.notificationService.getUserNotificationsById(id);
    }

    @Put('notifications/read')
    async readUserNotification(
        @Headers() headers,
        @Body() body: UpdateUserNotificationDto) {
            let token = headers["authorization"].replace("Bearer ", "");
            let decoded = await this.authService.verify(token);
            // console.log(body);
            return await this.notificationService.readUserNotification(decoded.uid, body);
    }

    @Put('notifications/assign')
    async assignAdminNotification(
        @Headers() headers,
        @Body() body ) {
            let token = headers["authorization"].replace("Bearer ", "");
            let decoded = await this.authService.verify(token);
            return await this.notificationService.assignAdminNotification(decoded.uid, body);
        }
}