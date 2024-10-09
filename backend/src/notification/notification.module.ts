import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { AdminNotification, AdminNotificationSchema } from "./admin-notification.schema";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { UserNotification, UserNotificationSchema } from "./user-notification.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: AdminNotification.name, schema: AdminNotificationSchema },
            { name: UserNotification.name, schema: UserNotificationSchema },
        ]),
        AuthModule
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [NotificationService],
})

export class NotificationModule { };