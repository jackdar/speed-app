import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserNotification {
    @Prop({ required: true })
    user_email: string;

    @Prop({ required: true })
    article_id: string;

    @Prop({ required: true })
    article_title: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    message: string;

    @Prop({ required: true })
    read: boolean;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const UserNotificationSchema = SchemaFactory.createForClass(UserNotification);