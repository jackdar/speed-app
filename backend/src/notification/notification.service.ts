
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdminNotification } from "./admin-notification.schema";
import { UserNotification } from "./user-notification.schema";
import { CreateAdminNotifcationDto } from "./dto/create-admin-notification.dto";
import { CreateUserNotificationDto } from "./dto/create-user-notification.dto";

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(AdminNotification.name) private adminNotiModel: Model<AdminNotification>,
        @InjectModel(UserNotification.name) private userNotiModel: Model<UserNotification>
    ) { }

    // Add some kind of check to either send an admin or user noti
    async sendNotification(notification: CreateAdminNotifcationDto | CreateUserNotificationDto): Promise<any> {

        try {
            if ("assigned" in notification) {
                await this.adminNotiModel.create(notification);
            } else if ("read" in notification) {
                await this.userNotiModel.create(notification);
            }
        } catch (error) {
            throw new BadRequestException("Failed to create notification: " + error);
        }
    }

    async getUnassignedNotifications(role: string): Promise<AdminNotification[]> {
        return await this.adminNotiModel.find({ role: role, assigned: false });
    }

    async getUserNotificationsById(id: string): Promise<UserNotification[]> {
        return await this.userNotiModel.find({ user_id: id })

    }
}