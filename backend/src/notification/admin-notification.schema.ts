import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class AdminNotification {
    @Prop({ required: true })
    user_email: string;

    @Prop({ required: true })
    article_id: string;

    @Prop({ required: true })
    article_title: string;

    @Prop({ required: true })
    role: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    message: string;

    @Prop({ required: true })
    assigned: boolean;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const AdminNotificationSchema = SchemaFactory.createForClass(AdminNotification);